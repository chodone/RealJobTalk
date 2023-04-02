from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling
from .views import tistory_review_crawling


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=13, minute=42, id = 'crawling')
    def auto_check():
        tistory_review_crawling()
        naver_news_crawlling()
        
    scheduler.start()