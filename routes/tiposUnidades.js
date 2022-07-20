const express = require("express");
const router = express.Router();
//const { validatorReadDocumento } = require("../validators/documentos");
const { readAllTiposUnidadesCtrl } = require("../controllers/tiposUnidades")


/**
 * RUTAS - TIPOS DE UNIDADES
Create documento: http://localhost:5000/api/tiposUnidades/read
 */

router.get('/read', readAllTiposUnidadesCtrl)

module.exports = router;