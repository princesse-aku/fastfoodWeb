// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path if db.js is not in the parent directory

router.get('/dishes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM dishes ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des plats :', error);
    res.status(500).json({ error: 'Échec de la récupération des plats' });
  }
});

router.get('/dishes/:id', async (req, res) => {
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

router.post('/dishes', async (req, res) => {
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

router.put('/dishes/:id', async (req, res) => {
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


router.delete('/dishes/:id', async (req, res) => {
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

module.exports = router;