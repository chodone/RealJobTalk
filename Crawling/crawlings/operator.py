from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling
from .views import naver_pass_review_crawlling
from .views import to_db
from .views import title_to_hdfs


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=10, minute=25, id = 'naver_pass_review_crawlling')
    def job1():
        # title_to_hdfs()
        naver_news_crawlling()
        naver_pass_review_crawlling()
        to_db()
        
    # @scheduler.scheduled_job('cron', hour=9, minute=9, id = 'naver_news_crawlling')
    # def job2():
    #     naver_news_crawlling()

    # @scheduler.scheduled_job('cron', hour=7, minute=52, id = 'tistory_review_crawling')
    # def job3():
    #     tistory_review_crawling()

    scheduler.start()

