const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/session");
const { homeCtrl } = require("../controllers/home");

/**
 * RUTAS
verification bearer Token del usuario loggeado: http://localhost:5000/api/home
 */

router.get("/", authMiddleware, homeCtrl);

module.exports = router;