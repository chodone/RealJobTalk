from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling
import time


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=1, minute=48, id = 'crawling')
    def auto_check():
        print('실행')
        time.sleep(3)
        naver_news_crawlling()
    scheduler.start()