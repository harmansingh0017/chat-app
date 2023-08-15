pipeline {

    agent any

    environment {
        registry = "harmans497"
        registryCredential = 'dockerhub'
    }

    stages {

        stage('Build Client') {
            steps {
                dir('client') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            dockerImageClient = docker.image("${registry}/chat-app-client:${BUILD_NUMBER}")
                            dockerImageClient.push()
                        }
                    }
                }
            }
        }

        stage('Build Server') {
            steps {
                dir('server') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            dockerImageServer = docker.image("${registry}/chat-app-server:${BUILD_NUMBER}")
                            dockerImageServer.push()
                        }
                    }
                }
            }
        }

        // ... Rest of your stages

    }
}
