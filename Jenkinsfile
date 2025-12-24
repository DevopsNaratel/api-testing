pipeline {
    agent any

    environment {
        // --- KONFIGURASI DOCKER ---
        DOCKER_IMAGE = 'diwamln/api-simple' 
        DOCKER_CREDS = 'docker-hub'
        
        // --- KONFIGURASI GIT (REPO MANIFEST) ---
        GIT_CREDS    = 'git-token'
        MANIFEST_REPO_URL = 'https://github.com/DevopsNaratel/api-simple.git' 
        
        // --- PATH FILE MANIFEST ---
        // Pastikan file deployment.yaml ini sudah ada di repo manifest Anda
        MANIFEST_TEST_PATH = 'api-simple/dev/deployment.yaml'
        MANIFEST_PROD_PATH = 'api-simple/prod/deployment.yaml' 
    }

    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t simple-express-api:${BUILD_NUMBER} .'
                sh 'docker tag simple-express-api:${BUILD_NUMBER} simple-express-api:latest'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker stop simple-express-api || true'
                sh 'docker rm simple-express-api || true'
                sh 'docker run -d --name simple-express-api -p 3000:3000 simple-express-api:latest'
            }
        }
    }
    
    post {
        always {
            sh 'docker system prune -f'
        }
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}