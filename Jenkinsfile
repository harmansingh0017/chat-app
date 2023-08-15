pipeline {

    agent any

    environment {
        registry = "harmans497"
        registryCredential = 'dockerhub' // You should define this in Jenkins credentials
    }

    stages {

        stage('BUILD') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build App Image') {
            steps {
                dir('client') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            dockerImageClient = docker.build("${registry}/chat-app-client:V${BUILD_NUMBER}")
                            dockerImageClient.push()
                        }
                    }
                }
            }
        }

        stage('Kubernetes Deploy') {
            agent { label 'KOPS' }
            steps {
                dir('helm/react-app') {
                    sh "helm upgrade --install --force react-app . --set appimage=${registry}/chat-app-client:V${BUILD_NUMBER} --namespace prod"
                }
            }
        }
    }
}
