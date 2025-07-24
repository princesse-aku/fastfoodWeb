// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const db = require('./db'); // Importe le pool de connexions à la base de données

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes API ---

/**
 * @swagger
 * /:
 *   get:
 *     summary: Bienvenue sur l'API
 *     responses:
 *       200:
 *         description: Message de bienvenue
 */
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API du Restaurant !');
});

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Message de test
 *     responses:
 *       200:
 *         description: Message de test pour le frontend
 */
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bonjour depuis l\'API backend !' });
});

/**
 * @swagger
 * /api/dishes:
 *   get:
 *     summary: Récupérer tous les plats
 *     responses:
 *       200:
 *         description: Liste des plats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/api/dishes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM dishes ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des plats :', error);
    res.status(500).json({ error: 'Échec de la récupération des plats' });
  }
});

/**
 * @swagger
 * /api/dishes/{id}:
 *   get:
 *     summary: Récupérer un plat par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du plat
 *     responses:
 *       200:
 *         description: Détails du plat
 *       404:
 *         description: Plat non trouvé
 */
app.get('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM dishes WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(`Erreur lors de la récupération du plat avec l'ID ${id} :`, error);
    res.status(500).json({ error: 'Échec de la récupération du plat' });
  }
});

/**
 * @swagger
 * /api/dishes:
 *   post:
 *     summary: Ajouter un nouveau plat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plat ajouté avec succès
 */
app.post('/api/dishes', async (req, res) => {
  const { name, description, price, category, image_url } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Le nom et le prix sont obligatoires pour un plat.' });
  }
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({ message: 'Le prix doit être un nombre positif valide.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO dishes (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, parsedPrice, category, image_url]
    );
    res.status(201).json({ id: result.insertId, message: 'Plat ajouté avec succès !' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un nouveau plat :', error);
    res.status(500).json({ error: 'Échec de l\'ajout du plat' });
  }
});

/**
 * @swagger
 * /api/dishes/{id}:
 *   put:
 *     summary: Mettre à jour un plat existant
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du plat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plat mis à jour avec succès
 */
app.put('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Le nom et le prix sont obligatoires pour la mise à jour.' });
  }
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({ message: 'Le prix doit être un nombre positif valide.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE dishes SET name = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?',
      [name, description, parsedPrice, category, image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Plat non trouvé ou aucune modification effectuée' });
    }
    res.json({ message: 'Plat mis à jour avec succès !' });
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du plat avec l'ID ${id} :`, error);
    res.status(500).json({ error: 'Échec de la mise à jour du plat' });
  }
});

/**
 * @swagger
 * /api/dishes/{id}:
 *   delete:
 *     summary: Supprimer un plat
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du plat
 *     responses:
 *       200:
 *         description: Plat supprimé avec succès
 *       404:
 *         description: Plat non trouvé
 */
app.delete('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM dishes WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.json({ message: 'Plat supprimé avec succès !' });
  } catch (error) {
    console.error(`Erreur lors de la suppression du plat avec l'ID ${id} :`, error);
    res.status(500).json({ error: 'Échec de la suppression du plat' });
  }
});

// --- Démarrage du serveur ---
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`API accessible à : http://localhost:${PORT}`);
  console.log(`Documentation Swagger : http://localhost:${PORT}/api-docs`);
  console.log(`Dossier des images accessible à : http://localhost:${PORT}/img/`);
});
