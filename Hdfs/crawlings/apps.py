from django.apps import AppConfig
from django.conf import settings


class CrawlingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'crawlings'

    def ready(self):
        if settings.SCHEDULER_DEFAULT:
            from . import operator
            operator.start()


    # def ready(self):
    #     super().ready()
    #     # 한번 불려야 하는데 두번 불림.
    #     # 두번 불리는 이유: https://stackoverflow.com/questions/33814615/how-to-avoid-appconfig-ready-method-running-twice-in-django
    #     #  Reload와 main 두가지 프로세스가 뜬다고 함.
    #     #  또는   로 실행하면 됨.
    #     if os.environ.get('RUN_MAIN', None) != 'true':
    #         # 이 조건일 때가 메인임.
    #         print("APP STARTED!!!")

    #         scheduler = BackgroundScheduler()
    #         # default는 MemoryStore, ThreadPoolExcecutor임.
    #         scheduler.configure(job_defaults={'coalesce': True}, timezone=timezone('Asia/Seoul'))
    #         # https://apscheduler.readthedocs.io/en/stable/modules/triggers/cron.html
    #         scheduler.add_job(kepsh1_job, 'cron', minute='*/15', second='40')
    #         scheduler.start()