require('dotenv').config(); // Charge les variables d'environnement depuis .env

const mysql = require('mysql2/promise'); // Utilise la version basée sur les promesses

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Nombre maximal de connexions au pool
  queueLimit: 0        // Pas de limite sur la file d'attente
});

// Fonction pour tester la connexion à la base de données au démarrage
async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connecté avec succès à la base de données MySQL !');
    connection.release(); // Libère la connexion vers le pool
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données :', error.message);
    process.exit(1); // Arrête le processus si la connexion échoue
  }
}

testDbConnection(); // Appelle la fonction de test au démarrage du module

module.exports = pool; // Exporte le pool de connexions pour qu'il puisse être utilisé dans server.js