FROM --platform=linux/amd64 python:3
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .
ENV TZ Asia/Seoul

RUN apt-get update && apt-get -y install sudo
RUN chmod +x /usr/src/app/dockerstart.sh

EXPOSE 8084

CMD ["/usr/src/app/dockerstart.sh"]
