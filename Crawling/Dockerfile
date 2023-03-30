FROM python:3
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .
ENV TZ Asia/Seoul

EXPOSE 8084

CMD ["python3", "manage.py", "runserver", "--noreload"]
