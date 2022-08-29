const express = require("express");
const router = express.Router();
const {
  validatorRemolque,
} = require("../validators/remolques");
const {
  createRemolqueCtrl,
  readAllRemolquesCtrl,
  readRemolqueCtrl,
  updateRemolqueCtrl,
  deleteRemolqueCtrl,
  readRemolquesEmpresaCtrl,
  readAllTiposRemolquesCtrl,
} = require("../controllers/remolques");

/**
 * RUTAS
Create Remolque: http://localhost:5000/api/remolques/create
Read All Remolquees: http://localhost:5000/api/remolques/read
Read One Remolque: http://localhost:5000/api/remolques/read/:id
Update Remolque: http://localhost:5000/api/remolques/update/:id
Delete Remolque: http://localhost:5000/api/remolques/delete/:id


Read Remolques by Empresa: http://localhost:5000/api/remolques/readByEmpresa/:id
 */

router.post("/create", validatorRemolque, createRemolqueCtrl);
router.get('/read', readAllRemolquesCtrl)
router.get("/read/:id", readRemolqueCtrl);
/**
 * CHECAR CASO ESPECIFICO PARA UPDATE: NO PUEDES ACTUALIZAR EL id_Empresa
 */
router.put(
  "/update/:id",
  validatorRemolque,
  updateRemolqueCtrl
);
router.delete("/delete/:id", 
//validatorReadUnidad,
deleteRemolqueCtrl);


router.get("/readByEmpresa/:id", readRemolquesEmpresaCtrl)
router.get("/readTypes/", readAllTiposRemolquesCtrl);


module.exports = router;
