const express = require('express');
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth')

const loginCtrl = require('../controllers/auth');

/***
 * Crear un registro
 */
//TODO http//localhost:5000/api/auth/login
//TODO http//localhost:5000/api/auth/register

router.post('/register', validatorRegister, loginCtrl)


module.exports = router; 