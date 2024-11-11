const express = require("express");
const router = express.Router();
const {
  validatorRemolque,
  validatorReadRemolque
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
const { authMiddleware } = require("../middleware/session");

/*
 * RUTAS
Create Remolque: http://localhost:5000/api/remolques/create
Read All Remolquees: http://localhost:5000/api/remolques/read
Read One Remolque: http://localhost:5000/api/remolques/read/:id
Update Remolque: http://localhost:5000/api/remolques/update/:id
Delete Remolque: http://localhost:5000/api/remolques/delete/:id
Read Remolques by Empresa: http://localhost:5000/api/remolques/readByEmpresa/:id
*/

router.post("/create", validatorRemolque, authMiddleware, createRemolqueCtrl);
router.get('/read', readAllRemolquesCtrl)
router.get("/read/:id", readRemolqueCtrl);
router.put("/update/:id", validatorRemolque, authMiddleware, updateRemolqueCtrl);
router.delete("/delete/:id",  validatorReadRemolque, authMiddleware, deleteRemolqueCtrl);

router.get("/readByEmpresa", authMiddleware, readRemolquesEmpresaCtrl)
router.get("/readTypes/", readAllTiposRemolquesCtrl);


module.exports = router;
