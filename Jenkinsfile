pipeline {
    agent any
    environment {
        registry = 'sevgulnl/pyrods'
        HOME = '.'
        JENKINS_USER = 'pi'
    }
    stages {
        stage('Initialize') {
            steps {
                sh 'python3 -m venv .'
                sh '. bin/activate'
                sh 'bin/pip install --upgrade -r requirements.txt'
            }
        }
        stage('Test') {
            steps {
                sh 'bin/python3 manage.py test'
            //sh "dotnet test UnitTest_eBoncuk.csproj"
            }
        }
        stage('Publish') {
            environment {   registryCredential = 'dockerhub'  }
            steps {
                script {
                    def appimage = docker.build registry + ":$BUILD_NUMBER"
                    docker.withRegistry( '', registryCredential ) {
                        appimage.push()
                        appimage.push('latest')
                    }
                    sh 'docker container rm pyrods --force'
                    sh 'docker run -dp 8100:8100 --name pyrods sevgulnl/pyrods'
                }
            }
        }
    }
}
