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
    host = 'j8c205.p.ssafy.io', # host name
    user = 'ssafyc205', # user name
    password = 'ssafyc205!', # password
    database = 'develop',
    port = '3306',
    auth_plugin='mysql_native_password'
)

enterpriseNameFile = open("enterpriseNames.txt", "r", encoding="UTF8")
lines = enterpriseNameFile.readlines()
enterpriseNameFile.close()

def naver_pass_review_crawlling():
    print('naver_news_crawlling 시작합니당')
    
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

        enterprise_id += 1
    conn_aws.close()

naver_pass_review_crawlling()