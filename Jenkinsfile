pipeline 
{
	agent any
	// tools {
	// 	gradle 'gradle 7.6.1'
	// }
	environment {
		PROJECT = 'jobtalk'
		APP_API = 'jobtalkbackend'
	}
	stages {
		stage('build-api') {
			when {
				anyOf {
					changeset "jobtalkbackend/**/*"
				}
			}
			steps {
				echo 'Build Start "${APP_API}"'
				sh 'chmod +x ${APP_API}/gradlew'
				sh '''
					${APP_API}/gradlew -p ${APP_API} build -x test
					docker build -t back-api-img ${APP_API}/. --no-cache
				'''
				echo 'Build End "${APP_API}"'
			}
			post {
				success {
					echo 'Back-api container stop Start.'
					sh '''
					if (docker ps | grep "back-api"); then docker stop back-api;
					fi
					'''
					echo 'Back-api container stop Success';
				}
			}
		}
		stage('build-front') {
			when {
				changeset "frontend/**/*"
			}
			steps {
				echo 'Build Start Front App'
				sh 'docker build -t front-img frontend/. --no-cache'
				echo 'Build End Front App'
			}
			post {
				success {
					echo 'Front container stop Start'
					sh '''
					if (docker ps | grep "front-app"); then docker stop front-app;
					fi
					'''
					echo 'Front container stop Success';
				}
			}
		}
		stage('build-crawling'){
			when {
				changeset "Crawling/**/*"
			}
			steps {
				echo 'Build Start Crawling'
				sh 'docker build -t crawling Crawling/. --no-cache'
				echo 'Build End Crawling'
			}
			post {
				success {
					echo 'Crawling container stop Start'
					sh '''
					if (docker ps | grep "crawling"); 
					then docker stop crawling;
					fi
					'''
					echo 'Crawling container stop Success';
				}
			}
		}
		stage('deploy-api') {
			when {
				anyOf {
					changeset "jobtalkbackend/**/*"
				}
			}
			steps {
				echo 'Deploy Start "${APP_API}"'
				sh 'docker run -it -d --rm -p 8082:8082 --name back-api back-api-img'
				echo 'Deploy End "${APP_API}"'
			}
		}
		stage('deploy-front') {
			when {
				changeset "frontend/**/*"
			}
			steps {
				echo 'Deploy Start Front App'
				sh '''
					docker run -it -d --rm -p 3000:3000 --name front-app front-img
				'''
				echo 'Deploy End Front App'
			}
		}
		stage('deploy-crawling'){
			when {
				changeset "Crawling/**/*"
			}
			steps {
				echo 'Deploy Start Crawling'
				sh 'docker run -it -d --rm -p 8084:8084 --name crawling crawling-img'
				echo 'Deploy End Crawling'
			}
		}
	}
}
