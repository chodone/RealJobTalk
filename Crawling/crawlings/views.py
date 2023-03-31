from django.shortcuts import render
import datetime
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from hdfs import InsecureClient
import time

def test():
    client_hdfs = InsecureClient("http://172.17.0.4:9870", user="root")
    print(client_hdfs.list('/user'))
    print(client_hdfs.list('/user/root'))

def naver_news_crawlling():
    print('시작합니당')
    client_hdfs = InsecureClient("http://172.17.0.4:9870", user="root")
    url = "https://openapi.naver.com/v1/search/news.json"

    headers = {
        "X-Naver-Client-Id" : "j2tBF73QPcZXpZ4vpNQK",
        "X-Naver-Client-Secret" : "aCnFyu3h5i",
        "User-Agent": "Mozilla/5.0"
    }

    enterpriseNameFile = open("enterpriseNames.txt", "r", encoding="UTF8")
    lines = enterpriseNameFile.readlines()
    enterpriseNameFile.close()

    for enterprise in lines:
    
        val = 1
        for idx in range(1, 11):
            params = {
                "query" : enterprise.strip(),
                "display" : 100,
                "start" : idx
            }
            print(enterprise.strip(), '!!!!!!!!!')
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

                        cleantext = BeautifulSoup(jsonIdx['title'], "lxml").text

                        value = enterprise.strip() + ('\n') + today + ('\n') + jsonIdx['link'] + ('\n') + cleantext + ('\n')  + ('\n') + content[0].text

                        time.sleep(3)
                        client_hdfs.write(f'/user/root/test/{filename}.txt', data=value, overwrite=True, encoding="UTF8")
