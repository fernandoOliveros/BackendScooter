const express = require('express');
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth')

const { loginCtrl, registerCtrl } = require('../controllers/auth');

/***
 * Crear un registro
 */
//TODO http//localhost:5000/api/auth/login
//TODO http//localhost:5000/api/auth/register

router.post('/register', validatorRegister, registerCtrl)
router.post('/login', validatorLogin, loginCtrl)

router.get('/home')


module.exports = router; 