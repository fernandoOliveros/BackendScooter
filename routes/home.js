const express = require('express');
const router = express.Router();
const { authMiddleware } = require("../middleware/session")
const { homeCtrl } = require("../controllers/home")


router.get('/', authMiddleware, homeCtrl)

module.exports = router; 