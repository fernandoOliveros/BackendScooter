const express = require('express');
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth')
const { loginCtrl, registerCtrl, getUsersCtrl } = require('../controllers/auth');

const {connection, mysql} = require("../config/mysql")


/***
 * Crear un registro
 */
//TODO http://localhost:5000/api/auth/login
//TODO http://localhost:5000/api/auth/register

router.post('/register', validatorRegister, registerCtrl)
router.post('/login', validatorLogin, loginCtrl)

router.get('/getusers', getUsersCtrl)
/*router.get('/getusers', (req, res) => { //ESTE SI JALA
    connection.query('SELECT * from users', function (err, result) {
    if (err) throw err;
    //console.log("Result: " + result);
    result= result;
    res.send(result)
    });
})*/


module.exports = router; 