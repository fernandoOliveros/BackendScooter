require("dotenv").config(); //variables de entorno
const express = require("express"); //uso de Express
const cors = require("cors");
const app = express();
const conexionDBmysql = require("./config/mysql");

app.use(cors());
app.use(express.json()); //Para realizar peticiones en formato json
app.use(express.urlencoded({extended: true})) //
app.use(express.static("storage")) //post public files in http

const port=process.env.PORT || 5000;

/**
 * AQUI INVOCAMOS A LAS RUTAS 
 */
app.use("/api", require("./routes"));

app.listen(port , () => {
    console.log(`Escuchando por el puerto: localhost:${port}`);
});

const ENGINE_DB=process.env.ENGINE_DB; //selecciona el tipo de base de datos
conexionDBmysql; //conexion a la base de datos MYSQL 



