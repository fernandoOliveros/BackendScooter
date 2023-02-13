const express = require('express');
const router = express.Router();

const { createXmlCtrl } = require('../controllers/createXml');
const {validatorXml} = require('../validators/CreateXml')

router.post('/test',validatorXml, createXmlCtrl);

module.exports = router; 