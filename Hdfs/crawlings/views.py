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
    
enterpriseNameFile = open("enterpriseNames.txt", "r", encoding="UTF8")
lines = enterpriseNameFile.readlines()
enterpriseNameFile.close()

client_hdfs = InsecureClient(getattr(settings, 'HDFS_IP', None), user="root")

def to_db():
    for idx in range(300):
        try:
           call_hdfs(idx)
        except:
            continue

def call_hdfs(idx):
     with client_hdfs.read(f"/user/root/newsTitleOutput/{idx}/part-r-00000", encoding="utf-8") as f:
        result = f.readlines()
        for val in result:
            word, count = " ".join(val.split()[:-1]) , val.split()[-1]

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