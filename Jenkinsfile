pipeline {
  agent any
  stages {
    stage('build and deploy') {
      steps {
        sh 'docker compose down'
        sh 'docker compose build'
        sh 'docker compose up'
      }
    }

  }
}