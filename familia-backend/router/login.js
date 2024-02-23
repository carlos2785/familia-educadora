const { Router } = require('express');
const router = Router();
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

router.post('/login', async function (req, res) {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    } else {
      const user = result.rows[0];// usuario encontrado

      // Comparar la contraseña suministrada con las de la BD 
      if (password === user.pass) {
        // Si la contraseña es válida, genera un token JWT
        const token = jwt.sign({ username: user.usuario }, secretKey, { expiresIn: '30m' });
        // Devuelve el token en la respuesta
        return res.json({ token });
      } else {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    }
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;