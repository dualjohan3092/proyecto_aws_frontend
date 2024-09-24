# Proyecto AWS Frontend

Este repositorio contiene scripts y configuraciones para configurar y desplegar el backend de un proyecto en AWS. A continuación se detalla el proceso de configuración y ejecución del entorno.

## Requisitos

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) (si se usa AWS)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/)

## Script de Configuración

El siguiente script realiza las siguientes acciones:

1. Conéctate al bastión de AWS.
2. Conéctate al servidor frontend.
3. Actualiza todas las dependencias.
4. Instala Git y Docker.
5. Inicia y habilita el servicio Docker.
6. Instala Docker Compose.
7. Clona el proyecto desde Git.
8. Construye y ejecuta la imagen Docker del frontend.
9. Ejecuta la aplicación sin contenedor (opcional).

```bash
#!/bin/bash

# Llave bastion us-west-1a
ssh -i "bastion_key.pem" ec2-user@ec2-184-169-168-102.us-west-1.compute.amazonaws.com

# Llave frontend 1 us-west-1a
ssh -i "frontend_key.pem" ubuntu@ec2-52-52-10-204.us-west-1.compute.amazonaws.com

# Actualizar todas las dependencias
sudo apt update
sudo apt upgrade -y

# Instalar git
sudo apt install git -y

# Instalar Docker
sudo apt install docker.io -y

# Iniciar el servicio Docker
sudo systemctl start docker

# Asegurarse de que el servicio Docker se inicie en el arranque
sudo systemctl enable docker

# Instalar NPM
sudo apt install npm -y

# Instalar nginx y otras herramientas necesarias
sudo apt install nginx-common -y
sudo apt install net-tools -y
sudo apt install curl -y

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clonar el proyecto desde GitHub
git clone https://github.com/johanbohorquez2021/ramp_up_5.git

# Cambiar al directorio del proyecto clonado
cd home/ubuntu/ramp_up_5/front-angular
cd ramp_up_5/front-angular/src/app/home

# Editar archivo de servicio
nano home-service.service.ts

# Construir y ejecutar el contenedor Docker para el proyecto frontend
docker build -t frontend .
docker run -d --name frontend-app -p 80:80 frontend
docker run -d --name frontend-app -p 8080:80 frontend
docker run -d --name frontend-app -p 8080:8080 frontend

# Construir y ejecutar el contenedor Docker para el proyecto frontend
sudo docker build -t front-angular .
sudo docker run -d --name front-angular -p 4200:4200 front-angular

# Ejecutar la aplicacion sin contenedor front-angular
command -v nvm
nvm install node
node -v
npm -v
npm install -g @angular/cli
npm install
npm install cors
ng serve --host 0.0.0.0 --port 4200

# Ejecutar la aplicacion sin contenedor frontend
node index.js
