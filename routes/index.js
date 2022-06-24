const express = require("express");
const router = express.Router();
const fs = require("fs"); //file system


const PATH_ROUTES = __dirname; // direccion lugar donde se encuentra un archivo

const removeExtension = (fileName)=>{
    //TODO tracks.js = ['tracks','js']
    return fileName.split(".").shift(); //agarra el primer indice del arreglo = tracks
}


fs.readdirSync(PATH_ROUTES).filter((file) => { //devuelve un array, lee de manera sincrona
    const name = removeExtension(file) //TODO index, tracks
    if(name!== 'index'){
        router.use(`/${name}`, require(`./${file}`)); //htttp://localhost:5000/api/tracks, por ejemplo
    }
    
}
)  




module.exports=router;