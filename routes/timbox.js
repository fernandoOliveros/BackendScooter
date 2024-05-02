const express = require("express");
const router = express.Router();
const {
  timboxAuthenticateCtrl,
  timbrarXML_Ctrl
} = require("../controllers/timbox");

const axios = require('axios');
const app = express();

router.get('/node-route', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/python-sellado');
    res.send(`Response from Node.js app: ${response.data.message}`);
  } catch (error) {
    res.status(500).send('Error communicating with Python app');
  }
});


          


/**
 * RUTAS - AUTHENTICATION TIMBOX
Create bearer STOKEN: http://localhost:5000/api/timbox/security/authenticate
http://localhost:5000/api/timbox//timboxTimbrar/:id //SEND ID from the table tbl_cfdi where you wanna stamp
 */

router.post("/security/authenticate", timboxAuthenticateCtrl);
router.post("/timboxTimbrar/:id", timbrarXML_Ctrl);


module.exports = router;
app.use(router);
