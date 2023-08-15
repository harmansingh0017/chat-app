pipeline {

    agent any
/*
	tools {
        maven "maven3"
    }
*/
    environment {
        registry = "harmans497"
        registryCredential = 'dockerhub'
    }

    stages{

        stage('BUILD'){
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
            
        }


        stage('Build App Image') {
          steps {
            script {
              dockerImageClient = docker.build("${registry}/chat-app-client:V${BUILD_NUMBER}", './client')
              dockerImageServer = docker.build("${registry}/chat-app-server:V${BUILD_NUMBER}", './server')
            }
          }
        }

        stage('Upload Image'){
          steps{
            script {
              docker.withRegistry('', registryCredential) {
                dockerImageClient.push("V$BUILD_NUMBER")
                dockerImageClient.push('latest')
                dockerImageServer.push("V$BUILD_NUMBER")
                dockerImageServer.push('latest')
              }
            }
          }
        }

         stage('Remove Unused docker image') {
          steps{
            sh "docker rmi $registry/chat-app-client:V$BUILD_NUMBER"
            sh "docker rmi $registry/chat-app-server:V$BUILD_NUMBER"
          }
        }

        stage('Kubernetes Deploy') {
          agent {label 'KOPS'}
            steps {
              sh "helm upgrade --install --force react-app helm/react-app --set appimage=${registry}:V${BUILD_NUMBER} --namespace prod"
            }
        }
    }


}
