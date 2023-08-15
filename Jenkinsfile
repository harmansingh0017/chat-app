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
                        sh 'npm install'
                        sh 'npm run build'
                        sh 'docker build -t ${registry}/chat-app-client:${BUILD_NUMBER} -f Dockerfile .'
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
                        sh 'npm install'
                        sh 'docker build -t ${registry}/chat-app-server:${BUILD_NUMBER} -f Dockerfile .'
                        docker.withRegistry('', registryCredential) {
                            dockerImageServer = docker.image("${registry}/chat-app-server:${BUILD_NUMBER}")
                            dockerImageServer.push()
                        }
                    }
                }
            }
        }

        stage('Remove Unused Docker Image') {
            steps {
                script {
                    def imageNameclient = "${registry}/chat-app-client:V${BUILD_NUMBER}"
                    def imageNameserver = "${registry}/chat-app-server:V${BUILD_NUMBER}"
                    sh "docker rmi $imageNameclient"
                    sh "docker rmi $imageNameserver"
                }
            }
        }

        // ... Rest of your stages

    }
}
