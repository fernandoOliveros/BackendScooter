const express = require('express');
const router = express.Router()

const {
    readClaveProductoServicioCtrl,
    readClaveUnidadPeso
  } = require('../controllers/productos')

  /**
 * RUTAS
Read el catalogo clave productos y servicios: http://localhost:5000/api/productos/readClaveProductoServicio
 */


router.get("/readClaveUnidadPeso/", readClaveUnidadPeso);
router.get("/readClaveProductoServicio/:descripcion", readClaveProductoServicioCtrl);


module.exports = router;
