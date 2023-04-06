from apscheduler.schedulers.background import BackgroundScheduler
from .views import naver_news_crawlling
from .views import naver_pass_review_crawlling
from .views import to_db
from .views import naver_pass_review_crawlling2
from .views import to_hdfs


def start():
    scheduler=BackgroundScheduler()

    @scheduler.scheduled_job('cron', hour=17, minute=33, id = 'naver_pass_review_crawlling')
    def job1():
        to_hdfs()
        # naver_pass_review_crawlling()
        # naver_news_crawlling()
        
        # naver_pass_review_crawlling2()
        
        
    @scheduler.scheduled_job('cron', hour=18, minute=50, id = 'naver_news_crawlling')
    def job2():
        to_db()

    # @scheduler.scheduled_job('cron', hour=7, minute=52, id = 'tistory_review_crawling')
    # def job3():
    #     tistory_review_crawling()

    scheduler.start()

