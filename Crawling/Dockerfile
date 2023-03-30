FROM python:3
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .
ENV TZ Asia/Seoul

RUN apt-get update && apt-get -y install sudo

EXPOSE 8084

CMD ["/usr/src/app/dockerstart.sh"]
