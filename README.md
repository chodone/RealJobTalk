# 프로젝트 개요 및 해야할 일 정리 (편집 중)
## 기술 스택 및 버전
|개요|기술|버전|
|------|---|---|
|**Backend**|
|빌드도구|gradle|7.6.1|
|개발환경|Java|11|
|개발환경|SpringBoot|2.7.9|
|**Frontend**|
|개발환경|node.js|18.12.1|
|**DevOps**|
|배포환경|Docker|20.10.21|


## 인수인계 사항
### Jenkins
|ID|admin|
|PW|admin1q2w3e|


## Jenkinsfile
예상 설정. 
1. env-config
 분산처리
 - hadoop

 프록시 서버
 - nginx

 DB
 - redis
 - mysql

2. backend, frontend build, deploy
설계에 따라 API, socket 등 backend 구성 변경.
