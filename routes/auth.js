const express = require('express');
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth')
const { matchedData } = require ('express-validator')

/***
 * Crear un registro
 */
//TODO http//localhost:5000/api/auth/login
//TODO http//localhost:5000/api/auth/register


/*
router.post('/register',  validatorRegister, (req, res)=>{
    res.send('listo');
})
*/
router.post('/register', validatorRegister, (req, res)=>{
    req = matchedData(req);
    res.send({data: req})
})


module.exports = router; 