const {Router}= require('express');
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

//////////////////GET//////////////////////
router.get('/fechas', async function(req,res){
    const selectFechas=`SELECT DISTINCT to_char(fecha, 'YYYY-MM-DD') as fecha_formateada FROM notas;`
    try {
        const {rows}=await pool.query(selectFechas);
        res.status(201).send({rows});

    } catch (error) {
        console.log(error);
        res.status(400).send('Error al mostrar fechas')
        
    }
});
module.exports=router;