const express = require("express");
const router = express.Router();
//const { validatorReadDocumento } = require("../validators/documentos");
const { readUnidadesEmpresaCtrl } = require("../controllers/unidadesEmpresa")
const {
    validatorUnidades,
    validatorReadUnidad,
  } = require("../validators/unidades");
const { authMiddleware } = require("../middleware/session");


/**
 * RUTAS - TIPOS DE UNIDADES
Create documento: http://localhost:5000/api/unidadesEmpresa/read
 */

router.get('/read', authMiddleware, readUnidadesEmpresaCtrl)

module.exports = router;