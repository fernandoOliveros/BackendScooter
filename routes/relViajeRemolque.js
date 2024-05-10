const express = require("express");
const router = express.Router();
const {
  createViajeRemolqueCtrl,
  // readAllRemolquesCtrl,
  // readRemolqueCtrl,
  // updateRemolqueCtrl,
  // deleteRemolqueCtrl,
  // readRemolquesEmpresaCtrl,
  // readAllTiposRemolquesCtrl,
} = require("../controllers/relViajeRemolque");

/**
 * RUTAS
Create Remolque: http://localhost:5000/api/remolques/create
Read All Remolquees: http://localhost:5000/api/remolques/read
Read One Remolque: http://localhost:5000/api/remolques/read/:id
Update Remolque: http://localhost:5000/api/remolques/update/:id
Delete Remolque: http://localhost:5000/api/remolques/delete/:id


Read Remolques by Empresa: http://localhost:5000/api/remolques/readByEmpresa/:id
 */

router.post("/create", createViajeRemolqueCtrl);
// router.get('/read', readAllRemolquesCtrl)
// router.get("/read/:id", readRemolqueCtrl);
// /**


module.exports = router;
