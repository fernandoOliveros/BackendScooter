const express = require('express');
const router = express.Router();
const { authMiddleware } = require("../middleware/session")
const { homeCtrl } = require("../controllers/home")

/**
 * TODO: http://localhost:5000/api/home, verification bearer Token
 */

router.get('/', authMiddleware, homeCtrl)

module.exports = router; 