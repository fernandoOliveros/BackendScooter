const express = require('express');
const router = express.Router()

const {
    readClaveProductoServicioCtrl,
  } = require('../controllers/productos')

  /**
 * RUTAS
Read el catalogo clave productos y servicios: http://localhost:5000/api/productos/readClaveProductoServicio
 */


router.get("/readClaveProductoServicio/", readClaveProductoServicioCtrl);

module.exports = router;
