pipeline 
{
	agent any
	tools {
		gradle 'gradle 7.6.1'
	}
	environment {
		PROJECT = 'jobtalk'
		APP_API = 'datecourse'
	}
	stages {
		// stage('environment') {
		// 	when {
		// 		changeset "env-config/**/*"
		// 	}
		// 	steps {
		// 		echo 'Environment Settings Start'
		// 		sh 'docker-compose -f env-config/docker-compose-env.yml down'
		// 		sh 'docker-compose -f env-config/docker-compose-env.yml up -d'
		// 		echo 'Environment Settings End'
		// 	}
		// }
		stage('build-api') {
			when {
				anyOf {
					changeset "backend/datecourse/**/*"
				}
			}
			steps {
				echo 'Build Start "${APP_API}"'
				sh 'chmod +x backend/gradlew'
				sh '''
					backend/${APP_API}/gradlew -p backend/${APP_API} build -x test
					docker build -t back-api-img backend/${APP_API} --no-cache
				'''
				echo 'Build End "${APP_API}"'
			}
		}
		stage('build-front') {
			when {
				changeset "frontend/**/*"
			}
			steps {
				echo 'Build Start Front App'
				sh 'docker build -t app-next frontend/. --no-cache'
				echo 'Build End Front App'
			}
		}
		stage('deploy-api') {
			when {
				anyOf {
					changeset "backend/datecourse/**/*"
				}
			}
			steps {
				echo 'Deploy Start "${APP_API}"'
				sh 'docker run -d -p 8082:8082 --name back-api back-api-img '
				echo 'Deploy End "${APP_API}"'
			}
		}
		stage('build-deploy-front') {
			when {
				changeset "frontend/**/*"
			}
			steps {
				echo 'Deploy Start Front App'
				sh '''
					docker run -d -p 3000:3000 --name front-app app-next
				'''
				echo 'Deploy End Front App'
			}
		}
	}
}
