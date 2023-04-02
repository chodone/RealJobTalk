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
import json
import xmltodict


conn_aws = mysql.connector.connect(
    host = getattr(settings, 'MYSQL_HOST', None), # host name
    user = getattr(settings, 'MYSQL_ID', None), # user name
    password = getattr(settings, 'MYSQL_PASSWD', None), # password
    database = getattr(settings, 'MYSQL_DB', None),
    port = '3306',
    auth_plugin='mysql_native_password'
)
    
client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")

enterpriseNameFile = open("enterpriseNames.txt", "r", encoding="UTF8")
lines = enterpriseNameFile.readlines()
enterpriseNameFile.close()


def tistory_review_crawling():
    print('tistory_review_crawling 시작합니당')

    url = "https://www.tistory.com/apis/post/read"

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

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
        for idx in range(300):
            print(enterprise.strip(), count)

            aTag = ''
            if count == 10:
                aTag = browser.find_element(By.XPATH,'//*[@id="rso"]/div[10]/div/div/div/div[1]/div/a').get_attribute('href')
                count = 0
                browser.find_element(By.XPATH, '//*[@id="pnnext"]').click()
            else:
                aTag = browser.find_element(By.XPATH, f'//*[@id="rso"]/div[{count}]/div/div/div[1]/div/a').get_attribute('href')
            
            count += 1

            params = {
                "access_token" : getattr(settings, 'TISTORY_APP_KEY', None),
                "blogName" : aTag.split('/')[2].split('.')[0],
                "postId" : aTag.split('/')[-1]
            }

            try:
                res = requests.get(url, headers=headers, params=params)
                xpars = xmltodict.parse(res.text)
                jsonDump = json.dumps(xpars)
                jsonBody = json.loads(jsonDump)
                dateOfIssue = "".join(jsonBody['tistory']['item']['date'].split(' ')[0].split('-'))

                if int(dateOfIssue[:4]) > 2019:
                    title =  jsonBody['tistory']['item']['title']
                    url = jsonBody['tistory']['item']['url']
                    cleantext = BeautifulSoup(jsonBody['tistory']['item']['content'], "lxml").text.strip()
                    
                    filename = dateOfIssue+"_tistory_review_"+enterprise.strip()+"_"+str(idx+1)
                    value = enterprise.strip() + ('\n') + dateOfIssue + ('\n') + url + ('\n') + title + ('\n') + cleantext
                    client_hdfs.write(f'/user/root/reviewInput/{enterprise.strip()}/{filename}.txt', data=value, overwrite=True, encoding="utf-8")

                    cursor = conn_aws.cursor()

                    selectSql = "SELECT MAX(pass_review_id) FROM pass_review"
                    cursor.execute(selectSql)
                    maxNewsId = cursor.fetchall()
                    maxNewsId = maxNewsId[0][0]
                    if maxNewsId == None:
                        maxNewsId = -1

                    conn_aws.commit()

                    sql = "INSERT INTO pass_review VALUES (%s, %s, %s, %s, %s, %s)"
                    value = (maxNewsId+1, dateOfIssue, title, url, enterprise_id, cleantext)
                    cursor.execute(sql, value)

                    conn_aws.commit()
            except:
                continue
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
        for idx in range(1, 11): #page
            params = {
                "query" : enterprise.strip(),
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

                    # 뉴스 본문 가져오기
                    content = news_html.select("div#dic_area")

                    if content == []:
                        content = news_html.select("#articeBody")
                    
                    if len(content) > 0:
                        today = datetime.today().strftime('%Y%m%d')
                        filename = today+"_naver_news_"+enterprise.strip()+"_"+str(val)
                        val += 1

                        titleText = BeautifulSoup(jsonIdx['title'], "lxml").text

                        contentVal = ''
                        for c in (content):
                            contentVal += c.text.strip()

                        value = enterprise.strip() + ('\n') + today + ('\n') + jsonIdx['link'] + ('\n') + titleText + ('\n') + contentVal
                        client_hdfs.write(f'/user/root/newsInput/{enterprise.strip()}/{filename}.txt', data=value, overwrite=True, encoding="utf-8")

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
                        
        enterprise_id += 1

    conn_aws.close()


