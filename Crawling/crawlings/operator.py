from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=9, minute=5, id = 'crawling')
    def auto_check():
        naver_news_crawlling()
    scheduler.start()