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

/////////////////////GET//////////////////
router.get('/grados', async function(req,res){
    const selctGrados=`SELECT DISTINCT grado FROM estudiantes;`
    try {
        const {rows}=await pool.query(selctGrados);
        res.status(201).send({rows});
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al mostrar grados');
    }
});

module.exports=router;