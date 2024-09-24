// script.js

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// Obtener el valor de la variable de entorno BACKEND_IP
const backendIp = process.env.BACKEND_IP;

// Construir la URL del backend utilizando la dirección IP obtenida
const backendUrl = `http://${backendIp}:3000/api`;

// Asignar la URL del backend a una variable global accesible desde tu HTML
window.backendUrl = backendUrl;
