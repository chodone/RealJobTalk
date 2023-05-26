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
from datetime import datetime
from selenium.webdriver.common.by import By

conn_aws = mysql.connector.connect(
    host = getattr(settings, 'MYSQL_HOST', None), # host name
    user = getattr(settings, 'MYSQL_ID', None), # user name
    password = getattr(settings, 'MYSQL_PASSWD', None), # password
    database = getattr(settings, 'MYSQL_DB', None),
    port = '3306',
    auth_plugin='mysql_native_password'
)
    


def title_to_hdfs():

    cursor = conn_aws.cursor()

    val = 0
    for idx in range(300):
        selectSql = "SELECT title, date_of_issue FROM news WHERE enterprise_id="+idx
        cursor.execute(selectSql)
        result = cursor.fetchall()
        conn_aws.commit()

        for item in result:
            filename = item[1]+"_naver_news_title_"+idx+"_"+str(val)
            client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")
            client_hdfs.write(f'/user/root/newsTitleInput/{idx}/{filename}.txt', data=item[0], overwrite=True, encoding="utf-8")

            val += 1


def naver_news_crawlling():

    enterpriseNameFile = open("enterpriseNames2.txt", "r", encoding="UTF8")
    lines = enterpriseNameFile.readlines()
    enterpriseNameFile.close()

    print('naver_news_crawlling 시작합니당')
    
    url = "https://openapi.naver.com/v1/search/news.json"

    headers = {
        "X-Naver-Client-Id" : getattr(settings, 'NAVER_CLIENT_ID', None),
        "X-Naver-Client-Secret" : "aCnFyu3h5i",
        "User-Agent": "Mozilla/5.0"
    }

    enterprise_id = 8
    for enterprise in lines:
    
        val = 1
        for idx in range(1, 11): #page

            try:
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

                        titleText = BeautifulSoup(jsonIdx['title'], "lxml").text
                        # if enterprise.strip() in titleText:
                            
                        # 뉴스 본문 가져오기
                        content = news_html.select("div#dic_area")

                        if content == []:
                            content = news_html.select("#articeBody")
                        
                        if len(content) > 0:
                            date_obj = datetime.strptime(' '.join(jsonIdx['pubDate'].split(', ')[1].split(' ')[:3]), '%d %b %Y')
                            dateOfIssue = date_obj.strftime("%Y%m%d")
                            print(dateOfIssue)
                            filename = dateOfIssue+"_naver_news_"+enterprise.strip()+"_"+str(val)
                            val += 1

                            contentVal = ''
                            for c in (content):
                                contentVal += c.text.strip()

                            value = enterprise.strip() + ('\n') + dateOfIssue + ('\n') + jsonIdx['link'] + ('\n') + titleText + ('\n') + contentVal
                            client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")
                            client_hdfs.write(f'/user/root/newsInput/{str(enterprise_id)}/{filename}.txt', data=value, overwrite=True, encoding="utf-8")
                            
                            filename = dateOfIssue+"_naver_news_title_"+str(enterprise_id)+"_"+str(val)
                            client_hdfs.write(f'/user/root/newsTitleInput/{str(enterprise_id)}/{filename}.txt', data=titleText, overwrite=True, encoding="utf-8")
                            time.sleep(3)

                            cursor = conn_aws.cursor()

                            selectSql = "SELECT MAX(news_id) FROM news"
                            cursor.execute(selectSql)
                            maxNewsId = cursor.fetchall()
                            maxNewsId = maxNewsId[0][0]
                            if maxNewsId == None:
                                maxNewsId = -1

                            conn_aws.commit()

                            sql = "INSERT INTO news (news_id, date_of_issue, title, url, enterprise_id, content, hot_rank)  VALUES (%s, %s, %s, %s, %s, %s, %s)"
                            value = (maxNewsId+1, dateOfIssue, titleText, jsonIdx['link'], enterprise_id, content[0].text.strip(), 0)
                            cursor.execute(sql, value)

                            conn_aws.commit()
            except:
                continue        
        enterprise_id += 1

    conn_aws.close()


def to_db():

    client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")

    for idx in range(4, 300):
        try:
            with client_hdfs.read(f"/user/root/newsTitleOutput/{idx}/part-r-00000", encoding="utf-8") as f:
                result = f.readlines()
                for val in result:
                    word, count = " ".join(val.split()[:-1]) , val.split()[-1]
                    print(word, count)

                    cursor = conn_aws.cursor()

                    selectSql = "SELECT MAX(keyword_id) FROM keyword"
                    cursor.execute(selectSql)
                    maxId = cursor.fetchall()
                    maxId = maxId[0][0]
                    if maxId == None:
                        maxId = -1

                    conn_aws.commit()

                    sql = "INSERT INTO keyword (keyword_id, enterprise_id, name, count)  VALUES (%s, %s, %s, %s)"
                    value = (maxId+1, idx, word, count)
                    cursor.execute(sql, value)

                    conn_aws.commit()
        except:
            continue



def naver_pass_review_crawlling():

    enterpriseNameFile = open("enterpriseNames3.txt", "r", encoding="UTF8")
    lines = enterpriseNameFile.readlines()
    enterpriseNameFile.close()

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
        for idx in range(1, 21): #page

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

                        cursor = conn_aws.cursor()

                        selectSql = "SELECT * FROM avoid_keyword"
                        cursor.execute(selectSql)
                        result = cursor.fetchall()
                        conn_aws.commit()

                        isAvoid = False
                        for avKey in result:
                            if avKey[1] in title or avKey[1] in content:
                                isAvoid = True
                                break

                        if isAvoid:
                            continue

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

                        sql = "INSERT INTO pass_review VALUES (%s, %s, %s, %s, %s, %s, %s)"
                        value = (maxNewsId+1, content, postdate, title, link, enterprise_id, 0)
                        cursor.execute(sql, value)

                        conn_aws.commit()
                    else:
                        continue
            except:
                continue
        enterprise_id += 1
    


def naver_pass_review_crawlling2():

    enterpriseNameFile = open("enterpriseNames4.txt", "r", encoding="UTF8")
    lines = enterpriseNameFile.readlines()
    enterpriseNameFile.close()

    print('naver_pass_review_crawlling 시작합니당')
    
    url = "https://openapi.naver.com/v1/search/blog.json"

    headers = {
        "X-Naver-Client-Id" : "j2tBF73QPcZXpZ4vpNQK",
        "X-Naver-Client-Secret" : "aCnFyu3h5i",
        "User-Agent": "Mozilla/5.0"
    }

    enterprise_id = 10
    for enterprise in lines:
    
        val = 1
        for idx in range(1, 21): #page

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

                        cursor = conn_aws.cursor()

                        selectSql = "SELECT * FROM avoid_keyword"
                        cursor.execute(selectSql)
                        result = cursor.fetchall()
                        conn_aws.commit()

                        isAvoid = False
                        for avKey in result:
                            if avKey[1] in title or avKey[1] in content:
                                isAvoid = True
                                break

                        if isAvoid:
                            continue

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

                        sql = "INSERT INTO pass_review VALUES (%s, %s, %s, %s, %s, %s, %s)"
                        value = (maxNewsId+1, content, postdate, title, link, enterprise_id, 0)
                        cursor.execute(sql, value)

                        conn_aws.commit()
                    else:
                        continue
            except:
                continue
        enterprise_id += 1
