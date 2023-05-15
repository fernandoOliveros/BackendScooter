const express = require("express");
const router = express.Router();


/***
 * WE DECLARE THE VALIDATORS
 */
const {
  validateCartaporte,
  //validatorReadCARTA PORTE,
} = require("../validators/cartaPorte");

const {
  validatorDirOrigenCartaPorte,
} = require("../validators/direccionOrigenCP");


const {
  createDireccionOrigenCPCtrl,
  /*readAllCARTA PORTECtrl,
  readCARTA PORTECtrl,
  updateCARTA PORTECtrl,
  deleteCARTA PORTECtrl,*/
} = require("../controllers/direccionOrigenCP");
const {
  createCartaPorteCtrl,
  /*readAllCARTA PORTECtrl,
  readCARTA PORTECtrl,
  updateCARTA PORTECtrl,
  deleteCARTA PORTECtrl,*/
} = require("../controllers/cartaPorte");




/**
 * RUTAS - CARTA PORTE
 * Create CARTA PORTE: http://localhost:5000/api/cartaporte/create
 * Read All CARTA PORTE: http://localhost:5000/api/CARTA PORTE/read
 * Read One CARTA PORTE: http://localhost:5000/api/CARTA PORTE/read/:id
 * Update CARTA PORTE: http://localhost:5000/api/CARTA PORTE/update/:id
 * Delete CARTA PORTE: http://localhost:5000/api/CARTA PORTE/delete/:id
 */

router.post("/create", validateCartaporte, createCartaPorteCtrl, validatorDirOrigenCartaPorte, createDireccionOrigenCPCtrl);
//router.get("/read", readAllCARTA PORTECtrl);
//router.get("/read/:id", validatorReadCARTA PORTE, readCARTA PORTECtrl);
//router.put("/update/:id", [validatorCreateCARTA PORTE, validatorReadCARTA PORTE], updateCARTA PORTECtrl);
//router.delete("/delete/:id", validatorReadCARTA PORTE, deleteCARTA PORTECtrl);

module.exports = router;
