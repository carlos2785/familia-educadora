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

////////////GET////////////////////////////////////////////
router.get('/estudiantes', async function(req,res){

    const listEstudiantes=`select *from estudiantes;`
    try {
        
        const {rows}=await pool.query(listEstudiantes);
        res.send(rows).status(201);

    } catch (err) {
        console.error(err);
        res.status(400).send('Ocurrio un error al listar estudiantes');
    }
});

////////////POST////////////////////////////////////////////
router.post('/estudiantes', async function(req,res){
    const idEstudiantes=`select COUNT(*) from estudiantes where id=${req.body.id};`
    // count= cuenta el número de filas en la tabla que cumplen con la condición que id=${req.body.id};
    // es decir cuántas veces a paarce el id en la tabla

    try{
        const idExistResult= await pool.query(idEstudiantes);
        const idExists = idExistResult.rows[0].count > 0;

        if (idExists) {
            return res.status(400).send('El id de estudiante ya está registrado');
        }
    
        const postEstudiantes=`insert into estudiantes (id, nombres, apellidos, grado, id_padres) 
        values (${req.body.id},'${req.body.nombres}', '${req.body.apellidos}','${req.body.grado}', ${req.body.id_padres});`
        await pool.query(postEstudiantes);
        res.status(201).send('estudiante registrado')
    } catch (err) {
        console.log(err);
        res.status(400).send('Ocurrio un error al crear el estudiante');
    }

});

/////////////////PUT///////////////////////////////////////
router.put('/estudiantes/:id', async function(req,res){
    const updateEstudiantes=`update estudiantes set nombres='${req.body.nombres}', apellidos='${req.body.apellidos}',
    grado='${req.body.grado}', id_padres=${req.body.id_padres} where id=${req.params.id};`

    try {
        await pool.query(updateEstudiantes);
        res.status(201).send('datos de estudiante actualizados');        
    } catch (error) {
        console.log(error);
        res.status(400).send('NO se pudo actualizar el estudiante');        
    }
});

///////////////DELETE//////////////////////////////////////////
router.delete('/estudiantes/:id', async function(req,res){
    const deleteEstudiantes=`delete from estudiantes where id=${req.params.id};`

    try {
        await pool.query(deleteEstudiantes);
        res.status(201).send('Estudiante borrado');
    } catch (error) {
        console.log(error);
        res.status(400).send('Estudiante eliminando');
    }
});

module.exports=router;