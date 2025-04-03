const express = require('express');
const axios = require('axios');
const app = express();
const serviceId = process.env.SERVICE_ID || 'unknown';

const REGISTRY_API = 'http://servicio-analiticas:3000';
const AUTH = { username: 'admin', password: 'secret' };

setInterval(async () => {
  try {
    const response = await axios.post(REGISTRY_API, {}, {
      auth: AUTH,
      headers: { 'X-Tomas-Useche': serviceId }
    });
    console.log(`[${serviceId}] Registro exitoso:`, response.data);
  } catch (error) {
    console.error(`[${serviceId}] Error en registro:`, error.message);
  }
}, 5000);

app.get('/', (req, res) => {
  axios.post('http://servicio-analiticas:3000/registro', {}, {
    auth: { username: 'admin', password: 'secret' },
    headers: { 'X-Tomas-Useche': serviceId }
  }).catch(e => console.error("Error registrando acceso:", e.message));

  res.send(`Cliente App - Instancia ${serviceId} | Registrado`);
});

app.listen(3001, () => {
  console.log(`Cliente ${serviceId} escuchando en puerto 3001`);
});