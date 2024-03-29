const {Router}=require('express');
const router= Router();
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

/////////////GET FILTRADO/////////////////
router.get('/padres/:id', async function(req,res){
    const {id}=req.params;
    const obtenerPadresId=`SELECT *FROM padres WHERE id=${id};`;
    try {
        const {rows}=await pool.query(obtenerPadresId);
        if (rows.length === 0) {
            // No se encontraron registros con el ID proporcionado
            res.status(404).send('No se encontraron registros con el ID proporcionado.');
        } else {
            // Se encontraron registros, enviarlos en la respuesta
            res.status(200).send(rows);
        }
    } catch (error) {
        console.log(error);
       res.status(500).send('Error al cargar los datos'); 
    }
});

/////////////GET/////////////////
router.get('/padres',async function(req,res){ //toco cambiar la ruta para manejar los dos endpoints con get
    const listPadres=`select *from padres;`
    
    try{
        const { rows }= await pool.query(listPadres);
        res.status(200).send({rows});
    }
    
    catch(err){
        console.error(err);
        res.status(500).send('Ha ocurrido un error');
    };
});

/////////////////POST//////////////////////
router.post('/padres', async function(req, res) {
    const idExistQuery = `SELECT COUNT(*) FROM padres WHERE id = ${req.body.id};`;

    try {
        const idExistResult = await pool.query(idExistQuery);
        const idExists = idExistResult.rows[0].count > 0;

        if (idExists) {
            return res.status(400).send('El ID ya está registrado');
        }

        const insertPadres = `INSERT INTO padres (id, nombres, apellidos) 
        VALUES (${req.body.id}, '${req.body.nombres}', '${req.body.apellidos}');`;

        await pool.query(insertPadres);
        res.status(201).send('Datos del padre registrados correctamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ha ocurrido un error al registrar');
    }
});

////////////////PUT/////////////////////////////
router.put('/padres/:id',async function(req,res){
    const updatePadres=`update padres set nombres='${req.body.nombres}', apellidos='${req.body.apellidos}' where id=${req.params.id};`
    try{
        await pool.query(updatePadres)
        res.status(201).send('Datos actualizados correctamente');
    }
   
    catch(err){
        console.error(err);
        res.status(400).send('Ha ocurrido un error al actualizar');
    }
});

/////////////DELETE/////////////////////////////
router.delete('/padres/:id',async function(req,res){
    const deletePadres=`delete from padres where id=${req.params.id};`
    
    try{
        await pool.query(deletePadres);
        res.status(201).send('usuario borrado');
    }
    catch(err){
        console.log(err);
        res.status(400).send('Hubo un error al borrar el usuario');
    }
});

module.exports=router;