from django.shortcuts import render
import datetime
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from hdfs import InsecureClient
import time
import mysql.connector
from django.conf import settings


def naver_news_crawlling():
    print('naver_news_crawlling 시작합니당')

    conn_aws = mysql.connector.connect(
        host = getattr(settings, 'MYSQL_HOST', None), # host name
        user = getattr(settings, 'MYSQL_ID', None), # user name
        password = getattr(settings, 'MYSQL_PASSWD', None), # password
        database = getattr(settings, 'MYSQL_DB', None),
        port = '3306',
        auth_plugin='mysql_native_password'
    )
    
    client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")
    url = "https://openapi.naver.com/v1/search/news.json"

    headers = {
        "X-Naver-Client-Id" : getattr(settings, 'NAVER_CLIENT_ID', None),
        "X-Naver-Client-Secret" : "aCnFyu3h5i",
        "User-Agent": "Mozilla/5.0"
    }

    enterpriseNameFile = open("enterpriseNames.txt", "r", encoding="UTF8")
    lines = enterpriseNameFile.readlines()
    enterpriseNameFile.close()

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
                        client_hdfs.write(f'/user/root/test/{filename}.txt', data=value, overwrite=True, encoding="utf-8")

                        time.sleep(3)

                        cursor = conn_aws.cursor()

                        selectSql = "SELECT MAX(news_id) FROM news"
                        cursor.execute(selectSql)
                        maxNewsId = cursor.fetchall()

                        conn_aws.commit()

                        sql = "INSERT INTO news (news_id, date_of_issue, title, url, enterprise_id, content)  VALUES (%s, %s, %s, %s, %s, %s)"
                        value = (maxNewsId[0][0]+1, today, titleText, jsonIdx['link'], enterprise_id, content[0].text.strip())
                        cursor.execute(sql, value)

                        conn_aws.commit()
                        
        enterprise_id += 1

    conn_aws.close()
