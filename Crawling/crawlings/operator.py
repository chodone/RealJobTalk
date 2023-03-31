from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling
from .views import test
import time


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=2, minute=8, id = 'crawling')
    def auto_check():
        print('실행')
        test()
        time.sleep(3)
        # naver_news_crawlling()
    scheduler.start()