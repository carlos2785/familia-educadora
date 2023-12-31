const express=require('express');
const app=express();
const cors=require('cors');
app.use(express.json());
//const{Pool}=require('pg');
const conectionBD = require('./BD/conexionBD');
const router = require('./router/padres');
require('dotenv').config();
const port=process.env.PORT;
app.use(cors());
conectionBD();
/////////////Padres/////////////////
app.use('',require('./router/padres'));
app.use('',require('./router/estudiantes'));
app.use('',require('./router/notas'));
app.use('',require('./router/consulta'));
app.use('',require('./router/fechas'))
app.use('',require('./router/grados'));

app.listen(port,()=>{
    console.log('app funcionando..')
});