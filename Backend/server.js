// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Make sure this path is correct
const db = require('./db');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes API ---
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API du Restaurant !');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bonjour depuis l\'API backend !' });
});

app.use('/api', menuRoutes);

// --- Démarrage du serveur ---
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`API accessible à : http://localhost:${PORT}`);
  console.log(`Documentation Swagger : http://localhost:${PORT}/api-docs`);
  console.log(`Dossier des images accessible à : http://localhost:${PORT}/img/`);
});