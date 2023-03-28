# 프로젝트 개요 및 해야할 일 정리 (편집 중)
## 기술 스택 및 버전
|개요|기술|버전|
|------|---|---|
|**Backend**|
|빌드도구|gradle|7.6.1|
|개발환경|Java|11|
|개발환경|SpringBoot|2.7.9|
|**분산처리**|
|분산처리도구|Hadoop|3.2.3|
|**Frontend**|
|개발환경|node.js|18.12.1|
|**DevOps**|
|배포환경|Docker|20.10.21|

<br>


# 프로젝트 환경설정 관련 정보 정리.
## nginx/default.conf
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
sudo vim [파일명].conf
sudo ln -s /etc/nginx/sites-available/[파일명].conf /etc/nginx/sites-enabled/[파일명].conf

sudo nginx -t
sudo systemctl restart nginx

```

## docker-compose.yml (사용되지 않음)
proxy nginx 의 docker 및 자동화 실행을 위해 작성된 파일입니다.
ssl 설정을 위한 볼륨 설정과 타임존 설정이 작성되었습니다.
시간 상 사용되지 않았으며 proxy nginx 실행은 수동으로 진행되었습니다.