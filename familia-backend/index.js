const express=require('express');
const app=express();
app.use(express.json());
//const{Pool}=require('pg');
const conectionBD = require('./BD/conexionBD');
const port=3000;

conectionBD();
/////////////Padres/////////////////
app.use('',require('./router/padres'));
app.use('',require('./router/estudiantes'));
app.listen(port,()=>{
    console.log('app funcionando..')
});