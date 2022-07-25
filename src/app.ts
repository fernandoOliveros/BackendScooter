import 'dotenv/config'
import conexionDBmysql from "./config/mysql";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import routes from "./routes"

const app = express();
app.use(cors());  
app.use(express.json()); //Para realizar peticiones en formato json

const port= process.env.PORT;

app.listen(port, () => {
  console.log(`Escuchando por el PUERTO: localhost:${port}`);
});

conexionDBmysql();

app.use("/api", routes); //leer index
