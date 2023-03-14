pipeline 
{
	agent any
	tools {
		gradle 'gradle 7.6.1'
	}
	environment {
		PROJECT = 'deco'
		APP_API = 'module-api'
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
					backend/gradlew -p backend/${APP_API} build -x test
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
				sh 'docker build -t app-vue frontend/. --no-cache'
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
				sh 'docker-compose -f backend/${APP_API}/docker-compose.yml build --no-cache'
				sh 'docker-compose -f backend/${APP_API}/docker-compose.yml up -d'
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
					docker stop front-app
					docker rm front-app
					docker run -d -p 3000:8083 --name front-app app-vue
				'''
				echo 'Deploy End Front App'
			}
		}
	}
}
