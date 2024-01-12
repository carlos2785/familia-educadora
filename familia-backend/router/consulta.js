const {Router}=require('express');
const router=Router();
const {Pool}=require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

////////////GET/////////////////////////////
router.get('/consulta', async function(req,res){
    const {grado, fecha} = req.query;

    try {
        const listNotasFechaGRado=`SELECT estudiantes.id AS id_estudiante,
        estudiantes.apellidos AS apellidos_estudiante, estudiantes.nombres AS nombres_estudiante,
        estudiantes.grado, notas.fecha AS fecha_taller, notas.nota AS nota_taller
        FROM estudiantes INNER JOIN 
        notas ON notas.id_estudiante = estudiantes.id WHERE estudiantes.grado='${grado}' AND notas.fecha='${fecha}';`

        const {rows} = await pool.query(listNotasFechaGRado);
        res.status(200).send({rows});
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al buscar datos');
        
    }
});


module.exports=router;