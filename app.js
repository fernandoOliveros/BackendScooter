require('dotenv').config() //para que use las variables de entorno

const jwt=require('jsonwebtoken'); //libreria para crear tokens

const express= require("express");
const cors= require ("cors");
const conexionDB = require('./config/mongo');
const conexionDBmysql = require("./config/mysql");
const req = require('express/lib/request');

const app=express()
app.use(cors()) 
app.use(express.json); // Nos permite utilizar formato json 
//app.use(express.urlencoded({extended=true})); //IDK


const ENGINE_DB=process.env.ENGINE_DB; //selecciona el tipo de base de datos

const port= process.env.port || 3000; //usar la variable de entorno "port", en su def la 3000

app.listen(port, ()=>{
    console.log('http://localhost:', port)
})

conexionDBmysql();


const user={
    name: 'Saul Cordova',
    email: 'saulh1im9@gmail.com',
};

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'60s'});
};




app.post('/api/login', (req,res)=> {
    if(req.body.name!== user.name){
        res.status(401).send('Credenciales incorrectas');
        return;
    }
    const accessToken=generateAccessToken(user);
    
    res.send({
        accessToken,
    })
)

 //CAMBIOS