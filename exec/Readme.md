# 포팅매뉴얼
## 🛫 기술 스택 및 배포 환경

### **Frontend**
|개요|기술|버전|
|------|---|---|
|개발환경|node.js|18.12.1|
|개발환경|react| - |
|개발환경|nextjs| - |

<span style='background-color: #fff5b1'> TODO : front 담당자 기술 버전 작성 </span>

<br>

### **Backend-API**
|개요|기술|버전|
|------|---|---|
|빌드도구|gradle|7.6.1|
|개발환경|Java|11|
|개발환경|SpringBoot|2.7.9|
<br>

### **Backend-crawling**
|개요|기술|버전|
|------|---|---|
| - |python|-|
| - |python|-|
| - |python|-|
<br>

<span style='background-color: #fff5b1'> TODO : crawling 담당자 기술 버전 작성 </span>

### **분산처리**
|개요|기술|버전|
|------|---|---|
|분산처리도구|Hadoop|3.2.3|
|자연어처리|Komoran|3.3.4|
<br>

### **기타 배포 관련 환경**
|개요|기술|버전|
|------|---|---|
|배포환경|Ubuntu|20.04.5 LTS|
|배포환경|Docker|23.0.1|
|배포환경|Jenkins|2.387.1 LTS|

## 배포
현 프로젝트는 Jenkins와 Docker로 CI/CD 구성이 완료되어있습니다. Jenkins가 설치된 환경에서 프로젝트와 연결을 마친다면 자동으로 Jenkinsfile을 인식하여 배포 명령어를 실행합니다.
자동 배포에 관련한 문서는 다음과 같습니다.
- [DevOps_Jenkins_Docker_CICD_서버_환경_구축.pdf](DevOps_Jenkins_Docker_CICD_서버_환경_구축.pdf)
<br/>

## 백엔드 빌드 방법
### 
docker가 설치되지 않은 환경에서 다음으로 프로젝트를 빌드하고 실행할 수 있습니다.
``` bash
# 빌드
./gradlew build -x test

# 실행
# java -jar build/libs/jobtalkbackend-0.0.1-SNAPSHOT.jar
```

## Kakao Dev 설정

<span style='background-color: #fff5b1'> TODO : backend 담당자 설정 방법 작성 </span>

## 프론트 엔드 빌드 방법
``` bash
# 
npm i
npm run build

# 실행
# npm run start
```
<br/>

## 배포 명령어
Backend-api
``` docker
docker build -t back-api-img jobtalkbackend/. --no-cache
if (docker ps | grep "back-api"); then docker stop back-api;
fi
docker run -it -d --rm -p 8082:8082 --name back-api back-api-img
```
Frontend
``` docker
docker build -t front-img frontend/. --no-cache
if (docker ps | grep "front-app"); then docker stop front-app;
fi
docker run -it -d --rm -p 3000:3000 --name front-app front-img
```
Crawling
``` docker
docker build -t crawling-img Crawling/. --no-cache
if (docker ps | grep "crawling"); 
then docker stop crawling;
fi
docker run -it -d --rm -p 8084:8084 --name crawling crawling-img
```

## Nginx Proxy Server SSL 셋팅
HTTPS 접속 설정을 위한 proxy server 셋팅 방법입니다.
nginx 설정에 대한 다음 파일을 필요로 하며, 특정 포트, 특정 경로의 접속만을 허용합니다.

```
server {

    if ($host = j8c205.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    listen [::]:80;
    server_name j8c205.p.ssafy.io;
    return 404; # managed by Certbot
}

server {
    
    location / {
        proxy_pass http://localhost:3000;
    }

    location /api {
        proxy_pass http://localhost:8082/api;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/j8c205.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/j8c205.p.ssafy.io/privkey.pem; # managed by Certbot
    # include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    error_page 500 502 503 504 /50.x.html;

    location = /50x.html {
        root /usr/share/nginx/html;
    }
}

```

위의 설정을 적용하기 위한 nginx 실행 명령은 다음과 같습니다.

```
sudo apt-get install nginx # nginx/1.18.0 (Ubuntu)
sudo systemctl stop nginx

sudo apt-get install letsencrypt
sudo letsencrypt certonly --standalone -d [도메인]
# 이메일 입력
# 서비스 이용 동의
# 정보 수집 동의 (선택)

# 발급받은 키 확인
cd /etc/letsencrypt/live/[도메인]
ls

# Nginx 설정 파일 작성
sudo vim [파일명].conf
sudo ln -s /etc/nginx/sites-available/[파일명].conf /etc/nginx/sites-enabled/[파일명].conf

sudo nginx -t
sudo systemctl restart nginx

```