const express = require("express");
const router = express.Router();
const {
  validatorContactosEmOperadores,
  validatorReadContactoEmOperador,
} = require("../validators/contactosEmOperadores");
const {
  createContactoCtrl,
  readAllContactosCtrl,
  readContactoCtrl,
  updateContactoCtrl,
  deleteContactoCtrl,
} = require("../controllers/contactosEmOperadores");

/**
 * RUTAS
Create Unidad: http://localhost:5000/api/contactosEmOperadores/create
Read All Unidades: http://localhost:5000/api/contactosEmOperadores/read
Read One Unidad: http://localhost:5000/api/contactosEmOperadores/read/:id
Update Unidad: http://localhost:5000/api/contactosEmOperadores/update/:id
Delete Unidad: http://localhost:5000/api/contactosEmOperadores/delete/:id
 */

router.post("/create", validatorContactosEmOperadores, createContactoCtrl);
router.get("/read", readAllContactosCtrl);
router.get("/read/:id", validatorReadContactoEmOperador, readContactoCtrl);
router.put(
  "/update/:id",
  validatorReadContactoEmOperador,
  validatorContactosEmOperadores,
  updateContactoCtrl
);
router.delete("/delete/:id", validatorReadContactoEmOperador, deleteContactoCtrl);

module.exports = router;
