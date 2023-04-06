#  프로젝트 환경설정 관련 정보 정리.
## deploy_conf/nginx/default.conf
proxy 서버로 사용된 nginx의 설정파일 입니다.
ssl 설정을 위해 선행 작업(letsencrypt 키발급)이 필요합니다.
proxy 서버 설정을 위해 필요한 작업은 다음과 같습니다.

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
cd /etc/nginx/sites-availabe
sudo vim [파일명].conf
sudo ln -s /etc/nginx/sites-available/[파일명].conf /etc/nginx/sites-enabled/[파일명].conf

sudo nginx -t
sudo systemctl restart nginx
```

## Jenkinsfile
소프트웨어 형상 관리(SCM, Software Configuration Management)를 위한 Jenkins pipeline script 파일입니다. 크게 stages안에 여러 stage로 구분되어 있으며, 각각 when으로 지정된 path의 변경사항이 발생될 때 stage에 작성된 명령어가 실행됩니다.

## */Dockerfile
프로젝트를 이미지로 빌드하기 위한 파일입니다. 언어 버전, 선행되는 명령어 등을 설정함으로서 각 프로젝트를 동일한 환경에서 실행할 수 있습니다.

## deploy_conf/docker-compose.yml (사용되지 않음)
proxy nginx 의 docker 및 자동화 실행을 위해 작성된 파일입니다.
ssl 설정을 위한 볼륨 설정과 타임존 설정이 작성되었습니다.
시간 상 사용되지 않았으며 proxy nginx 실행은 수동으로 진행되었습니다.