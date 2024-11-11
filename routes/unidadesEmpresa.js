const express = require("express");
const router = express.Router();
const { readUnidadesEmpresaCtrl } = require("../controllers/unidadesEmpresa")
const { authMiddleware } = require("../middleware/session");

/*
 * RUTAS
  Read All Unidades By Empresa: api/unidadesEmpresa/read
*/

router.get('/read', authMiddleware, readUnidadesEmpresaCtrl)

module.exports = router;