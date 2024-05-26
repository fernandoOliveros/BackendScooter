const express = require("express");
const router = express.Router();
const {
  createViajeRemolqueCtrl,
  updateViajeRemolqueCtrl,
  deleteViajeRemolqueCtrl,  
  // readAllRemolquesCtrl,
  readViajeRemolqueCtrl,
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
router.post("/update/:id_CartaPorte/:id_Viaje/:id_Remolque", updateViajeRemolqueCtrl);
router.delete("/delete/:id_CartaPorte/:id_Viaje/:id_Remolque", deleteViajeRemolqueCtrl);
router.get('/read/:id_CartaPorte', readViajeRemolqueCtrl)




// router.get('/read', readAllRemolquesCtrl)
// router.get("/read/:id", readRemolqueCtrl);
// /**


module.exports = router;
