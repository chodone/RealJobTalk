# Hadoop 프로젝트
## 개요
Komoran 적용 키워드 추출 분산시스템 프로젝트

## Komoran 이란
Java로 개발된 한국어 형태소 분석기 [공식문서](https://docs.komoran.kr/index.html) / [깃허브](https://github.com/shineware/KOMORAN)
키워드(명사) 추출 로직에 사용됨

## 외부라이브러리(Komoran)를 Hadoop 프로젝트에 적용하는 법
### 1. 의존성 주입 Gradle - build.gradle
```groovy
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
```
```groovy
dependencies {
  implementation 'com.github.shin285:KOMORAN:3.3.4'
}
```

### 2. Hadoop 외부라이브러리 지정
#### 방법 1 - 외부라이브러리 포함 jar파일 생성
하둡 프로젝트를 만든 IDE에서 외부 라이브러리를 포함하여 jar파일을 생성합니다.

#### 방법 2 - Class path 지정
하둡은 외부 라이브러리를 사용하려면 HADOOP_CLASSPATH라는 환경변수를 설정해주어야하며, 해당 경로에 사용할 외부라이브러리를 넣어두어야합니다. 이는 다음의 명령어로 가능합니다.
```bash
vi $HADOOP_HOME/etc/hadoop/hadoop-env.sh

# 특정 폴더 안에 모든 jar파일을 참조할 수 있도록 외부 라이브러리 경로 지정
export HADOOP_CLASSPATH=$(find $HADOOP_HOME/share/hadoop -name '*.jar' | xargs echo | tr ' ' ':')
```

#### 방법 3 - 실행 시 -libjars 옵션 설정
``` bash
hadoop jar {project_jar_file} {class_name_with_package_path} {input_hdfs_dir} {output_hdfs_dir}
```

## Hadoop 프로젝트 실행
```bash
# 프로젝트 실행시 package명 타이핑 필수
# 2번 방법시 실행 명령어. ClassNotFound 발생으로 3번 방법으로 변경함.
# hadoop jar {project_jar_file} com.ssafy.study.hadoop.WordCount crawling_test crawling_test_out

# 3번 방법. -libjars
cd /usr/local/hadoop_project
hadoop jar hadoop10.jar com.ssafy.study.hadoop.WordCount -libjars /usr/local/hadoop/share/hadoop/KOMORAN-3.3.4.jar testdir testdir_out
```