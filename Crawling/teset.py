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


enterpriseNameFile = open("enterpriseNames.txt", "r", encoding="UTF8")
lines = enterpriseNameFile.readlines()
enterpriseNameFile.close()



print('tistory_review_crawling 시작합니당')

url = "https://www.tistory.com/apis/post/read"

headers = {
    "User-Agent": "Mozilla/5.0"
}

options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])

browser = webdriver.Chrome('./chromedriver.exe', options=options) #"./chromedriver.exe"
browser.implicitly_wait(30)
browser.maximize_window()

for enterprise in lines:
    browser.get("https://www.google.com/search?q="+enterprise.strip()+" 합격 후기 site:tistory.com")
    
    for idx in range(1, 300):
        print(str(idx)*30)

        isWriteDate = False
        try:
            write_date = browser.find_element(By.XPATH, f'//*[@id="rso"]/div[{idx}]/div/div/div[2]/div/span[1]/span').text
            isWriteDate = True
        except:
            pass

        title = browser.find_element(By.XPATH, f'//*[@id="rso"]/div[{idx}]/div/div/div[1]/div/a/h3').text
        print(title)
        
        if (isWriteDate and int(write_date.split('.')[0]) > 2019) or '2021' in title or '2020' in title or '2022' in title or '21' in title or '22' in title or '20' in title:

            aTag = browser.find_element(By.XPATH, f'//*[@id="rso"]/div[{idx}]/div/div/div[1]/div/a').get_attribute('href')
            print(aTag)

            params = {
                "access_token" : 'a9356d05163a6af4030ca9dd8a68da40_136d9085af9fefc038f15b14124717eb',
                "blogName" : aTag.split('/')[2].split('.')[0],
                "postId" : aTag.split('/')[-1]
            }

            res = requests.get(url, headers=headers, params=params)
            xpars = xmltodict.parse(res.text)
            jsonDump = json.dumps(xpars)
            jsonBody = json.loads(jsonDump)

            cleantext = BeautifulSoup(jsonBody['tistory']['item']['content'], "lxml").text.strip()
            print(cleantext)
            print("".join(jsonBody['tistory']['item']['date'].split(' ')[0].split('-')))
            print(type(jsonBody['tistory']['item']['date']))


            
                