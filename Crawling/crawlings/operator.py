from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling
from .views import tistory_review_crawling
from .views import naver_pass_review_crawlling


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=16, minute=20, id = 'naver_pass_review_crawlling')
    def job1():
        naver_pass_review_crawlling()

    @scheduler.scheduled_job('cron', hour=16, minute=21, id = 'naver_news_crawlling')
    def job2():
        naver_news_crawlling()

    @scheduler.scheduled_job('cron', hour=16, minute=22, id = 'tistory_review_crawling')
    def job3():
        tistory_review_crawling()
        
    scheduler.start()

