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
                        dockerImage = docker.build registry + "/chat-app-client:V$BUILD_NUMBER"
                        docker.withRegistry('', registryCredential) {
                            dockerImageClient = docker.image("${registry}/chat-app-client:V${BUILD_NUMBER}")
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
                        dockerImage = docker.build registry + "/chat-app-server:V$BUILD_NUMBER"
                        docker.withRegistry('', registryCredential) {
                            dockerImageServer = docker.image("${registry}/chat-app-server:V${BUILD_NUMBER}")
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

        stage('Kubernetes Deploy') {
          agent {label 'KOPS'}
            steps {
               sh "helm upgrade --install --force chat-app helm/chat-app --set image.client.repository=${registry}/chat-client:V${BUILD_NUMBER},image.server.repository=${registry}/chat-server:V${BUILD_NUMBER} --namespace prod"
                
            }
        }

        // ... Rest of your stages

    }
}
