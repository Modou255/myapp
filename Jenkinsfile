pipeline {
    agent any
    
    environment {
        DEPLOY_SERVER = '192.168.159.133'
        DEPLOY_USER = 'administrateur'
        REPO_URL = 'https://github.com/Modou255/myapp.git'
    }

stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: env.REPO_URL
            }
        }

stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit '**/test-results.xml' // Si vous configurez Jest pour générer des rapports JUnit
                }
                failure {
                    emailext body: 'Tests failed in ${BUILD_URL}', subject: 'Tests Failed - ${JOB_NAME}', to: 'team@example.com'
                }
            }
        }

stage('Build') {
            steps {
                sh 'npm run build' // Si vous avez un script de build
            }
        }
        
        stage('Deploy with Ansible') {
            steps {
                script {
                    def ansiblePlaybook = 'deploy.yml'
                    def extraVars = [
                        "app_version=${env.BUILD_ID}",
                        "deploy_server=${env.DEPLOY_SERVER}",
                        "deploy_user=${env.DEPLOY_USER}"
                    ]
                    
                    ansiblePlaybook(
                        playbook: ansiblePlaybook,
                        inventory: 'inventory.ini',
                        extras: "--extra-vars '${extraVars.collect { k,v -> \"${k}=${v}\" }.join(' ')}'"
                    )
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend(color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'")
        }
        failure {
            slackSend(color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'")
        }
    }
}
