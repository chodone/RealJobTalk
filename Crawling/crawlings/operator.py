from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling
from .views import test


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=3, minute=5, id = 'crawling')
    def auto_check():
        print('실행')
        # test()
        naver_news_crawlling()
    scheduler.start()