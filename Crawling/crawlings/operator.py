from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling
from .views import tistory_review_crawling
from .views import naver_pass_review_crawlling


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=7, minute=58, id = 'naver_pass_review_crawlling')
    def job1():
        naver_pass_review_crawlling()

    @scheduler.scheduled_job('cron', hour=7, minute=59, id = 'naver_news_crawlling')
    def job2():
        naver_news_crawlling()

    # @scheduler.scheduled_job('cron', hour=7, minute=52, id = 'tistory_review_crawling')
    # def job3():
    #     tistory_review_crawling()
        
    scheduler.start()

