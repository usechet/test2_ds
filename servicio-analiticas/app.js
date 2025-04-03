const express = require('express');
const app = express();
app.use(express.json());

const registros = {};

app.post('/servicio-analiticas', (req, res) => {
  const serviceId = req.headers['X-Tomas-Useche'];
  
  if (!serviceId) {
    return res.status(400).send('Falta X-Tomas-Useche header');
  }

  registros[serviceId] = (registros[serviceId] || 0) + 1;
  
  console.log(`Registro recibido de ${serviceId}. Total: ${registros[serviceId]}`);
  res.json({ 
    servicio: serviceId,
    registros: registros[serviceId],
    timestamp: new Date().toISOString()
  });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-Tomas-Useche');
  next();
});

app.get('/servicio-analiticas', (req, res) => {

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Autenticación requerida' });
  }
  
  res.json({
    totalRegistros: Object.values(registros).reduce((a, b) => a + b, 0),
    servicios: registros,
    fecha: new Date().toISOString()
  });
});

app.listen(3000, () => {
  console.log('API Registro escuchando en puerto 3000');
});