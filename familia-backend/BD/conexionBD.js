const { Pool } = require('pg');

async function conectionBD() {
    const pool = new Pool({
        user: 'default',
        host: 'ep-small-cherry-56065721-pooler.us-east-1.postgres.vercel-storage.com',
        database: 'verceldb',
        password: 'qfx1XL9HoAzi',
        port: 5432,
        ssl: { rejectUnauthorized: false }
    });
    try {
        await pool.query('SELECT 1');
        console.log('Conexion exitosa.');
        return pool;
    } catch (error) {
        console.error('Error al conectarse a la BD:', error);
        throw error;
    }
}

module.exports = conectionBD;
