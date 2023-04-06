FROM --platform=linux/amd64 python:3
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .
ENV TZ Asia/Seoul

RUN apt-get update && apt-get -y install sudo 
RUN chmod +x /usr/src/app/dockerstart.sh
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb 
RUN apt -y install ./google-chrome-stable_current_amd64.deb 
RUN wget https://chromedriver.storage.googleapis.com/111.0.5563.64/chromedriver_linux64.zip
RUN unzip chromedriver_linux64.zip

EXPOSE 8084

CMD ["/usr/src/app/dockerstart.sh"]
