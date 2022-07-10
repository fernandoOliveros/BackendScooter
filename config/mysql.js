
//const Sequelize=require ("sequelize");
var mysql = require('mysql');

const host = process.env.mysql_HOST;
const user = process.env.mysql_USERNAME;
const password = process.env.mysql_PASSWORD;
const database = process.env.mysql_DB;


/*var connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
 });

conne = connection.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('Conexion correcta pero');
    }
 });*/

 //module.exports = {connection, conne, mysql};
