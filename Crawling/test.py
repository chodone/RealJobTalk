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

enterpriseNameFile = open("enterpriseNames.txt", "r", encoding="UTF8")
lines = enterpriseNameFile.readlines()
enterpriseNameFile.close()

conn_aws = mysql.connector.connect(
    host = 'j8c205.p.ssafy.io', # host name
    user = 'ssafyc205', # user name
    password = 'ssafyc205!', # password
    database = 'c205dev',
    port = '3306',
    auth_plugin='mysql_native_password'
)

def test():
    cursor = conn_aws.cursor()
    
    selectSql = "SELECT title, enterprise_id FROM news WHERE news_id in (400, 401)"
    cursor.execute(selectSql)
    result = cursor.fetchall()
    conn_aws.commit()

    print(result)

def naver_news_crawlling():
    print('naver_news_crawlling 시작합니당')
    
    url = "https://openapi.naver.com/v1/search/news.json"

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
                            print(type(dateOfIssue))
                            # print(titleText, dateOfIssue)
                            # # filename = dateOfIssue+"_naver_news_"+enterprise.strip()+"_"+str(val)
                            # val += 1

                            # contentVal = ''
                            # for c in (content):
                            #     contentVal += c.text.strip()

                            # # value = enterprise.strip() + ('\n') + dateOfIssue + ('\n') + jsonIdx['link'] + ('\n') + titleText + ('\n') + contentVal
                            # # client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")
                            # # client_hdfs.write(f'/user/root/newsInput/{enterprise_id}/{filename}.txt', data=value, overwrite=True, encoding="utf-8")
                            
                            # # filename = dateOfIssue+"_naver_news_title_"+enterprise_id+"_"+str(val)
                            # # client_hdfs.write(f'/user/root/newsTitleInput/{enterprise_id}/{filename}.txt', data=titleText, overwrite=True, encoding="utf-8")
                            # # time.sleep(3)

                            # cursor = conn_aws.cursor()

                            # selectSql = "SELECT MAX(news_id) FROM news"
                            # cursor.execute(selectSql)
                            # maxNewsId = cursor.fetchall()
                            # maxNewsId = maxNewsId[0][0]
                            # if maxNewsId == None:
                            #     maxNewsId = -1

                            # conn_aws.commit()

                            # sql = "INSERT INTO news (news_id, date_of_issue, title, url, enterprise_id, content)  VALUES (%s, %s, %s, %s, %s, %s)"
                            # value = (maxNewsId+1, dateOfIssue, titleText, jsonIdx['link'], enterprise_id, content[0].text.strip())
                            # cursor.execute(sql, value)

                            # conn_aws.commit()
            except:
                continue        
        enterprise_id += 1

# naver_news_crawlling()
test()