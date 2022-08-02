const express = require("express");
const router = express.Router();
const { readAllColoniasCtrl} = require("../controllers/colonias")


/**
 * RUTAS - TIPOS DE UNIDADES
Create documento: http://localhost:5000/api/tiposUnidades/read
 */

router.get('/read', readAllColoniasCtrl)

module.exports = router;