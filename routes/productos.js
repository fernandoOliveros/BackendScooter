const express = require('express');
const router = express.Router()

const {
    readClaveProductoServicioCtrl,
    readClaveUnidadPeso,
    readClaveProductoServicioById
  } = require('../controllers/productos')

  /**
 * RUTAS
Read el catalogo clave productos y servicios: http://localhost:5000/api/productos/readClaveProductoServicio
 */


router.get("/readClaveUnidadPeso/", readClaveUnidadPeso);
router.get("/readClaveProductoServicio/:descripcion", readClaveProductoServicioCtrl);
router.get("/readClaveProductoServicioById/:id", readClaveProductoServicioById);


module.exports = router;
