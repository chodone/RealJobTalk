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
import xml.etree.ElementTree as elemTree
import xmltodict
import xml.etree.ElementTree as ET


enterpriseNameFile = open("enterpriseNames.txt", "r", encoding="UTF8")
lines = enterpriseNameFile.readlines()
enterpriseNameFile.close()


conn_aws = mysql.connector.connect(
    host = 'j8c205.p.ssafy.io', # host name
    user = 'ssafyc205', # user name
    password = 'ssafyc205!', # password
    database = 'sh_test',
    port = '3306',
    auth_plugin='mysql_native_password'
)


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
path='../chromedriver'

aTag = "https://dogfootja.tistory.com/44"
params = {
    "access_token" : 'a9356d05163a6af4030ca9dd8a68da40_136d9085af9fefc038f15b14124717eb',
    "blogName" : aTag.split('/')[2].split('.')[0],
    "postId" : aTag.split('/')[-1]
}

print(params)
print(url)

res = requests.get(url, headers=headers, params=params)

print()
print(res.text)
print()

soup = BeautifulSoup(res.text, "xml")
items = soup.find("tistory").find("item").find("title").text
print("".join(soup.find("tistory").find("item").find("date").text.split(' ')[0].split('-')))

# print(root)

# print(res.text[:500])

# tree = elemTree.fromstring(res.text)
# xmlRoot = tree.find('tistory')
# print(xmlRoot)

# dateOfIssue = "".join(jsonBody['tistory']['item']['date'].split(' ')[0].split('-'))
# print(dateOfIssue)

# if int(dateOfIssue[:4]) > 2019:
#     title =  jsonBody['tistory']['item']['title']
#     url = jsonBody['tistory']['item']['url']
#     cleantext = BeautifulSoup(jsonBody['tistory']['item']['content'], "lxml").text.strip()
    
#     print('hdfs 전송완료')
#     print(title, url)