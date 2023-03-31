from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=0, minute=35, id = 'crawling')
    def auto_check():
        print('실행')
        naver_news_crawlling()
    scheduler.start()