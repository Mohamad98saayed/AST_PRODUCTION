pipeline {
  agent any
  stages {
    stage('build and deploy') {
      steps {
        sh 'sh "docker-compose -p down"'
        sh 'sh "docker-compose -p build"'
        sh 'sh "docker-compose -p up"'
      }
    }

  }
}