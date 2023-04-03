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

url = "https://www.tistory.com/apis/post/read"
aTag = "https://babookim.tistory.com/25"

headers = {
    "User-Agent": "Mozilla/5.0"
}

params = {
    "access_token" : "a9356d05163a6af4030ca9dd8a68da40_136d9085af9fefc038f15b14124717eb",
    "blogName" : aTag.split('/')[2].split('.')[0],
    "postId" : aTag.split('/')[-1]
}

res = requests.get(url, headers=headers, params=params)
soup = BeautifulSoup(res.text, "xml")

aTag = 'https://babookim.tistory.com/25'

{'access_token': 'a9356d05163a6af4030ca9dd8a68da40_136d9085af9fefc038f15b14124717eb', 'blogName': 'babookim', 'postId': '25'}

res = requests.get(url, headers=headers, params=params)
print("&&&&&&&&&&&&&&&&&&&&&&")
print("&&&&&&&&&&&&&&&&&&&&&&")
print(res.text)
soup = BeautifulSoup(res.text, "html.parser")

print(soup.find('tistory').find("item"))