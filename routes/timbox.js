const express = require("express");
const router = express.Router();
const {
  timboxAuthenticateCtrl,
  timbrarXML_Ctrl
} = require("../controllers/timbox");


/**
 * RUTAS - AUTHENTICATION TIMBOX
Create bearer STOKEN: http://localhost:5000/api/timbox/security/authenticate
 */

router.post("/security/authenticate", timboxAuthenticateCtrl);
router.post("/timboxTimbrar/:id", timbrarXML_Ctrl);


module.exports = router;
