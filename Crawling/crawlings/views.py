from django.shortcuts import render
import datetime
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from hdfs import InsecureClient
import time
import mysql.connector
from django.conf import settings
from selenium import webdriver
from selenium.webdriver.common.by import By

conn_aws = mysql.connector.connect(
    host = getattr(settings, 'MYSQL_HOST', None), # host name
    user = getattr(settings, 'MYSQL_ID', None), # user name
    password = getattr(settings, 'MYSQL_PASSWD', None), # password
    database = getattr(settings, 'MYSQL_DB', None),
    port = '3306',
    auth_plugin='mysql_native_password'
)
    


enterpriseNameFile = open("enterpriseNames.txt", "r", encoding="UTF8")
lines = enterpriseNameFile.readlines()
enterpriseNameFile.close()


def tistory_review_crawling():
    print('tistory_review_crawling 시작합니당')

    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument("--single-process")
    options.add_argument("--disable-dev-shm-usage")
    path='/usr/src/app/chromedriver'

    browser = webdriver.Chrome(path, options=options) #"./chromedriver.exe"
    browser.implicitly_wait(30)
    browser.maximize_window()

    enterprise_id = 0
    for enterprise in lines:
        browser.get("https://www.google.com/search?q="+enterprise.strip()+" 합격 후기 site:tistory.com")
        
        count = 1
        for idx in range(10):
            print(enterprise.strip(), count)

            aTag = ''
            try:
                if count == 10:
                    aTag = browser.find_element(By.XPATH,'//*[@id="rso"]/div[10]/div/div/div/div[1]/div/a').get_attribute('href')
                    count = 1
                    browser.find_element(By.XPATH, '//*[@id="pnnext"]').click()
                else:
                    aTag = browser.find_element(By.XPATH, f'//*[@id="rso"]/div[{count}]/div/div/div[1]/div/a').get_attribute('href')
                
            except:
                count += 1
                continue

            count += 1

            res = requests.get(aTag)
            soup = BeautifulSoup(res.text, "lxml")

            root = soup.find('body').find(attrs={"id":"content"})
            if root == None:
                continue

            title = root.find('h1')
            content = root.find(attrs={"class":"tt_article_useless_p_margin"})
            if content == None:
                continue
            if content.find("li") != None:
                content.find("li").decompose()
            dateOfIssue = root.find(attrs={"class":"timeago"})
            if dateOfIssue == None:
                dateOfIssue = root.find(attrs={"class":"date"})

            if title == None or dateOfIssue == None:
                continue

            title = title.text
            dateOfIssue = dateOfIssue.text
            content = content.text

            filename = dateOfIssue+"_tistory_review_"+enterprise.strip()+"_"+str(idx+1)
            value = enterprise.strip() + ('\n') + dateOfIssue + ('\n') + aTag + ('\n') + title + ('\n') + content
            client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")
            client_hdfs.write(f'/user/root/reviewInput/{enterprise_id}/{filename}.txt', data=value, overwrite=True, encoding="utf-8")
            print('hdfs 전송완료')
            cursor = conn_aws.cursor()

            selectSql = "SELECT MAX(pass_review_id) FROM pass_review"
            cursor.execute(selectSql)
            maxNewsId = cursor.fetchall()
            maxNewsId = maxNewsId[0][0]
            if maxNewsId == None:
                maxNewsId = -1

            conn_aws.commit()

            sql = "INSERT INTO pass_review VALUES (%s, %s, %s, %s, %s, %s)"
            value = (maxNewsId+1, content, dateOfIssue, title, aTag, enterprise_id)
            cursor.execute(sql, value)

            conn_aws.commit()
            print('mysql 전송완료')
        enterprise_id += 1
    conn_aws.close()


def naver_news_crawlling():
    print('naver_news_crawlling 시작합니당')
    
    url = "https://openapi.naver.com/v1/search/news.json"

    headers = {
        "X-Naver-Client-Id" : getattr(settings, 'NAVER_CLIENT_ID', None),
        "X-Naver-Client-Secret" : "aCnFyu3h5i",
        "User-Agent": "Mozilla/5.0"
    }

    enterprise_id = 0
    for enterprise in lines:
    
        val = 1
        for idx in range(1, 21): #page

            try:
                params = {
                    "query" : enterprise.strip()+" 사업",
                    "display" : 100,
                    "start" : idx
                }
                res = requests.get(url, headers=headers, params=params)

                for jsonIdx in res.json()['items']:
                    if 'n.news.naver' in jsonIdx['link']:
                        #각 기사 html get하기
                        header = {'User-Agent': 'Mozilla/5.0'}
                        news = requests.get(jsonIdx['link'],headers=header)
                        news_html = BeautifulSoup(news.text,"lxml")

                        titleText = BeautifulSoup(jsonIdx['title'], "lxml").text
                        if enterprise.strip() in titleText:
                            
                            # 뉴스 본문 가져오기
                            content = news_html.select("div#dic_area")

                            if content == []:
                                content = news_html.select("#articeBody")
                            
                            if len(content) > 0:
                                today = datetime.today().strftime('%Y%m%d')
                                filename = today+"_naver_news_"+enterprise.strip()+"_"+str(val)
                                val += 1

                                contentVal = ''
                                for c in (content):
                                    contentVal += c.text.strip()

                                value = enterprise.strip() + ('\n') + today + ('\n') + jsonIdx['link'] + ('\n') + titleText + ('\n') + contentVal
                                client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")
                                client_hdfs.write(f'/user/root/newsInput/{enterprise_id}/{filename}.txt', data=value, overwrite=True, encoding="utf-8")

                                time.sleep(3)

                                cursor = conn_aws.cursor()

                                selectSql = "SELECT MAX(news_id) FROM news"
                                cursor.execute(selectSql)
                                maxNewsId = cursor.fetchall()
                                maxNewsId = maxNewsId[0][0]
                                if maxNewsId == None:
                                    maxNewsId = -1

                                conn_aws.commit()

                                sql = "INSERT INTO news (news_id, date_of_issue, title, url, enterprise_id, content)  VALUES (%s, %s, %s, %s, %s, %s)"
                                value = (maxNewsId+1, today, titleText, jsonIdx['link'], enterprise_id, content[0].text.strip())
                                cursor.execute(sql, value)

                                conn_aws.commit()
            except:
                continue        
        enterprise_id += 1

    conn_aws.close()


def to_hdfs():

    cursor = conn_aws.cursor()

    selectSql = "select a.*, b.name from pass_review a, enterprise b where a.enterprise_id = b.enterprise_id;"
    cursor.execute(selectSql)
    resultArr = cursor.fetchall()
    conn_aws.commit()

    idx = 0
    for result in resultArr:
        content = result[1]
        dateOfIssue = result[2]
        title = result[3]
        url = result[4]

        if enterpriseId < int(result[5]):
            idx = 0
        enterpriseId = result[5]

        enterpriseName = result[6]

        filename = dateOfIssue+"_naver_review_"+enterpriseId+"_"+str(idx+1)
        value = enterpriseName + ('\n') + dateOfIssue + ('\n') + url + ('\n') + title + ('\n') + content

        client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")
        client_hdfs.write(f'/user/root/reviewInput/{enterpriseId}/{filename}.txt', data=value, overwrite=True, encoding="utf-8")

        idx += 1


    cursor = conn_aws.cursor()

    selectSql = "select a.*, b.name from news a, enterprise b where a.enterprise_id = b.enterprise_id;"
    cursor.execute(selectSql)
    resultArr = cursor.fetchall()
    conn_aws.commit()

    idx = 0
    for result in resultArr:
        content = result[1]
        dateOfIssue = result[2]
        title = result[4]
        url = result[5]

        if enterpriseId < int(result[6]):
            idx = 0
        enterpriseId = result[6]

        enterpriseName = result[7]

        filename = dateOfIssue+"_naver_news_"+enterpriseId+"_"+str(idx+1)
        value = enterpriseName + ('\n') + dateOfIssue + ('\n') + url + ('\n') + title + ('\n') + content

        client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")
        client_hdfs.write(f'/user/root/newsInput/{enterpriseId}/{filename}.txt', data=value, overwrite=True, encoding="utf-8")

        idx += 1
    conn_aws.close()


def naver_pass_review_crawlling():
    print('naver_pass_review_crawlling 시작합니당')
    
    url = "https://openapi.naver.com/v1/search/blog.json"

    headers = {
        "X-Naver-Client-Id" : "j2tBF73QPcZXpZ4vpNQK",
        "X-Naver-Client-Secret" : "aCnFyu3h5i",
        "User-Agent": "Mozilla/5.0"
    }

    enterprise_id = 0
    for enterprise in lines:
    
        val = 1
        for idx in range(1, 11): #page

            try:
                params = {
                    "query" : enterprise.strip()+" 합격 후기",
                    "display" : 100,
                    "start" : idx
                }
                res = requests.get(url, headers=headers, params=params)

                root = res.json()

                for idx in range(100):
                
                    title = BeautifulSoup(root['items'][idx]['title'], "lxml").text
                    link = root['items'][idx]['link']
                    postdate = root['items'][idx]['postdate']

                    headers2 = {
                        "User-Agent": "Mozilla/5.0"
                    }
                    response = requests.get(link, headers=headers2)
                    response.raise_for_status()
                    soup = BeautifulSoup(response.text, "lxml")

                    src_url = "https://blog.naver.com/" + soup.iframe["src"]

                    response = requests.get(src_url, headers=headers2)
                    response.raise_for_status()
                    soup = BeautifulSoup(response.text, "lxml")

                    if soup.find("div", attrs={"class" : "se-main-container"}):
                        content = soup.find("div", attrs={"class" : "se-main-container"}).get_text()
                        content = content.replace("\n", "")

                        filename = postdate+"_naver_review_"+enterprise.strip()+"_"+str(idx+1)
                        value = enterprise.strip() + ('\n') + postdate + ('\n') + link + ('\n') + title + ('\n') + content
                        client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")
                        client_hdfs.write(f'/user/root/reviewInput/{enterprise_id}/{filename}.txt', data=value, overwrite=True, encoding="utf-8")

                        cursor = conn_aws.cursor()

                        selectSql = "SELECT MAX(pass_review_id) FROM pass_review"
                        cursor.execute(selectSql)
                        maxNewsId = cursor.fetchall()
                        maxNewsId = maxNewsId[0][0]
                        if maxNewsId == None:
                            maxNewsId = -1

                        conn_aws.commit()

                        sql = "INSERT INTO pass_review VALUES (%s, %s, %s, %s, %s, %s)"
                        value = (maxNewsId+1, content, postdate, title, link, enterprise_id)
                        cursor.execute(sql, value)

                        conn_aws.commit()
                    else:
                        continue
            except:
                continue
        enterprise_id += 1
    


