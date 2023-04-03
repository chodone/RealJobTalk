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

browser = webdriver.Chrome(path, options=options) #"./chromedriver.exe"
browser.implicitly_wait(30)
browser.maximize_window()

enterprise_id = 0
for enterprise in lines:
    time.sleep(3)
    browser.get("https://www.google.com/search?q="+enterprise.strip()+" 합격 후기 site:tistory.com")
    
    count = 1
    for idx in range(300):
        time.sleep(3)
        print(enterprise.strip(), count)

        aTag = ''
        if count == 10:
            aTag = browser.find_element(By.XPATH,'//*[@id="rso"]/div[10]/div/div/div/div[1]/div/a').get_attribute('href')
            count = 0
            browser.find_element(By.XPATH, '//*[@id="pnnext"]').click()
        else:
            aTag = browser.find_element(By.XPATH, f'//*[@id="rso"]/div[{count}]/div/div/div[1]/div/a').get_attribute('href')
        
        print(aTag)
        count += 1

        params = {
            "access_token" : "a9356d05163a6af4030ca9dd8a68da40_136d9085af9fefc038f15b14124717eb",
            "blogName" : aTag.split('/')[2].split('.')[0],
            "postId" : aTag.split('/')[-1]
        }

        print()
        res = requests.get(url, headers=headers, params=params)
        print()
        print(params)
        print()
        print("&&&&&&&&&&&&&&&&&&&&&&")
        print("&&&&&&&&&&&&&&&&&&&&&&")
        print(res)
        soup = BeautifulSoup(res.text, "lxml")
        print(soup)

        root = soup.find("tistory")
        print('---')
        print(root)
        

        dateOfIssue = "".join(root.find("item").find("date").text.split(' ')[0].split('-'))
        print(dateOfIssue)

        if int(dateOfIssue[:4]) > 2019:
            title =  root.find("item").find("title").text
            url = root.find("item").find("url").text
            cleantext = root.find("item").find("content").text.strip()
            
            filename = dateOfIssue+"_tistory_review_"+enterprise.strip()+"_"+str(idx+1)
            value = enterprise.strip() + ('\n') + dateOfIssue + ('\n') + url + ('\n') + title + ('\n') + cleantext
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
            value = (maxNewsId+1, dateOfIssue, title, url, enterprise_id, cleantext)
            cursor.execute(sql, value)

            conn_aws.commit()
            print('mysql 전송완료')
    enterprise_id += 1
conn_aws.close()




aTag = "https://gusdnr69.tistory.com/298"
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