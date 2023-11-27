const express = require("express");
const router = express.Router();

/***
 * VALIDATORS
 */
const {
  validateCartaporte,
  //validatorReadCARTA PORTE,
} = require("../validators/cartaPorte");

const {
  validatorDirOrigenCartaPorte,
} = require("../validators/direccionOrigenCP");

const {
  validatorDirDestinoCartaPorte,
} = require("../validators/direccionDestinoCP");

/***
 * CONTROLLERS
 */
const {
  createDireccionOrigenCPCtrl,
} = require("../controllers/direccionOrigenCP");

const {
  createCartaPorteCtrl,
  readCartaPorteCtrl,
  updateCartaPorteCtrl,
  readOneCartaPorteCtrl,
  readAllByEmpresaCartaPorteCtrl,
  deleteCartaPorteCtrl

} = require("../controllers/cartaPorte");

const {
  createDireccionDestinoCPCtrl,
} = require("../controllers/direccionDestinoCP");

/**
 * RUTAS - CARTA PORTE
 * Create CARTA PORTE: http://localhost:5000/api/cartaporte/create
 * Read All CARTA PORTE: http://localhost:5000/api/CARTA PORTE/read
 * Read One CARTA PORTE: http://localhost:5000/api/CARTA PORTE/read/:id
 * Update CARTA PORTE: http://localhost:5000/api/CARTA PORTE/update/:id
 * Delete CARTA PORTE: http://localhost:5000/api/CARTA PORTE/delete/:id
 */

// router.post(
//   "/create",
//   validateCartaporte,
//   createCartaPorteCtrl,
//   validatorDirOrigenCartaPorte,
//   createDireccionOrigenCPCtrl,
//   validatorDirDestinoCartaPorte,
//   createDireccionDestinoCPCtrl
// );

router.post("/create", validateCartaporte, createCartaPorteCtrl);
router.put("/update/:id", validateCartaporte, updateCartaPorteCtrl);
router.get("/read/:id", readOneCartaPorteCtrl);
router.get("/readAllByEmpresa/:id", readAllByEmpresaCartaPorteCtrl);
router.delete("/delete/:id",deleteCartaPorteCtrl);





//router.get("/read", readAllCARTA PORTECtrl);
//router.get("/read/:id", validatorReadCARTA PORTE, readCARTA PORTECtrl);

module.exports = router;
