const {Router}=require('express');
const router=Router();
const {Pool}=require('pg');

const pool = new Pool({
    user: 'default',
    host: 'ep-small-cherry-56065721-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'qfx1XL9HoAzi',
    port: 5432,
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
        res.status(201).send({rows});
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al buscar datos');
        
    }
});


module.exports=router;