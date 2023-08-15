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
		dir('client'){
                     steps {
                       script {
                                dockerImageClient = docker.build("${registry}/chat-app-client:V${BUILD_NUMBER}")
            }
          }
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
