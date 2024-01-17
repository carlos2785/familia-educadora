const {Router}=require('express');
const router= Router();
const {Pool}=require('pg');
require('dotenv').config();
//const bodyParser = require('body-parser');

//router.use(bodyParser.json());

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

////////////////POST/////////////////////
router.post('/registro', async function(req, res) {
    const { fecha, estudiantes } = req.body;
  
    if (!fecha || !estudiantes || !Array.isArray(estudiantes)) {
      return res.status(400).json({ mensaje: 'Solicitud incorrecta' });
    }
  
    const client = await pool.connect();//es necesario para que ese cliente realice todas las operaciones en la bd, sin necesidad de abrir y cerrar transacciones
  
    try {
      // Iniciar la transacción
      await client.query('BEGIN');
  
      // Iterar sobre cada estudiante y preparar las inserciones
      for (const estudiante of estudiantes) {
        const { id_estudiante, nota } = estudiante;
        //console.log(`Fecha: ${fecha}, Estudiante: ${id_estudiante}, Nota: ${nota}`);
  
        // Ejecutar la inserción para cada estudiante
        await client.query('INSERT INTO notas (fecha, id_estudiante, nota) VALUES ($1, $2, $3)', [fecha, id_estudiante, nota]);
      }
  
      // Finalizar la transacción
      await client.query('COMMIT');
  
      // Responder con éxito
      res.status(200).json({ mensaje: 'Estudiantes registrados exitosamente' });
    } catch (error) {
      // Revertir la transacción en caso de error
      await client.query('ROLLBACK');//
      console.error(error);
      res.status(400).json({ mensaje: 'No se han podido registrar los estudiantes' });
    } finally {
      // Liberar el cliente de la piscina
      client.release();
    }
  });

module.exports=router;