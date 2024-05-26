require("dotenv").config(); //variables de entorno
const express = require("express"); //uso de Express
const cors = require("cors");
const app = express();
const {conexionDBmysql} = require("./config/mysql");
const errorHandler = require('./utils/handleError.js');



app.use(cors());
app.use(express.json()); //Para realizar peticiones en formato json
app.use(express.urlencoded({extended: true})) //
app.use(express.static("storage/documentos")) //post public files in http

const port=process.env.PORT || 5000;

/**
 * AQUI INVOCAMOS A LAS RUTAS 
 */
app.use("/api", require("./routes")); //leer index
app.use(errorHandler)

const ENGINE_DB=process.env.ENGINE_DB; //selecciona el tipo de base de datos
conexionDBmysql; //conexion a la base de datos MYSQL 

app.listen(port , () => {
    console.log(`Escuchando por el PUERTO: localhost:${port}`);
});



// Global error handling for uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Optionally, restart the process if necessary
    // process.exit(1);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally, restart the process if necessary
    // process.exit(1);
  });


