const express = require('express');
const router = express.Router();

const { createXmlCtrl } = require('../controllers/createXml');


router.get('/test', createXmlCtrl);

module.exports = router; 