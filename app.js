require("dotenv").config(); //variables de entorno
const express = require("express"); //uso de Express
const cors = require("cors");
const app = express();
const conexionDBmysql = require("./config/mysql");
const jwt=require('jsonwebtoken'); //libreria para crear tokens
const { restart } = require("nodemon"); 



app.use(cors());
app.use(express.json()); //Para realizar peticiones en formato json
app.use(express.urlencoded({extended: true})) //acentos

const port=process.env.PORT || 5000;

/**
 * AQUI INVOCAMOS A LAS RUTAS 
 */
app.use("/api", require("./routes"));

app.listen(port , () => {
    console.log(`Escuchando por el puerto: localhost:${port}`);
});


const ENGINE_DB=process.env.ENGINE_DB; //selecciona el tipo de base de datos
 //conexion a la base de datos MYSQL 
 conexionDBmysql;


/*const user={
    Id_Empresa: '1000',
    email:"saulh1im9@gmail.com",
    password: "dszk01"
};
const user2={
    Id_Empresa: '1001',
    email:"charly@gmail.com",
    password: "charly01"
};

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); //falta el tiempo de expiracion
};


app.post('/post/login', (req,res)=>{
    if(req.body.email !== user.email){
        res.status(401).send('Error: correo invalido');
        return;
    }
    if(req.body.password!== user.password){
        res.status(401).send('Error: contraseña incorrecta');
        return;
    }
    const accessToken=generateAccessToken(user);
    res.send({accessToken});
});



app.get('/api/authenticate', authenticateToken, (req, res) => {
    res.send(req.user);
});*/
