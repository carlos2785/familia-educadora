const {Router}= require('express');
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