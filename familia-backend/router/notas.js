const {Router}=require('express');
const router= Router();
const {Pool}=require('pg');


const pool = new Pool({
    user: 'default',
    host: 'ep-small-cherry-56065721-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'qfx1XL9HoAzi',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

/////////////GET//////////////////////////////////
router.get('/notas', async function(req,res){
    
    try {
        const listNotas=`select *from notas;`
        const {rows}=await pool.query(listNotas);
        res.status(201).send({rows});
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al cargar las notas');
    }
});

//////////////POST///////////////////////////////////////
router.post('/notas', async function (req,res){
    
    try {
        const postNotas= `insert into notas (fecha,id_estudiante,nota) 
        values('${req.body.fecha}',${req.body.id_estudiante},${req.body.nota});`
        await pool.query(postNotas);
        res.status(201).send('Nota registrada');
    } catch (error) {
        console.log(error);
        res.status(400).send('No se pudo registrar la nota');
    }
    
});

////////////////DELETE////////////////////////////////////////
router.delete('/notas/:id', async function(req,res){

    const deleteNotas=`delete from notas where id=${req.params.id};`

    try {
        await pool.query(deleteNotas);
        res.status(201).send('Nota eliminada');
    } catch (error) {
        console.log(error);
        res.status(400).send('No se pudo eliminar la nota');
    }
});

module.exports=router;