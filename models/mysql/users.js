//const {connection, conne, mysql} = require("../../config/mysql")
var mysql = require('mysql');
//const express = require('../../app')


class Dbmanager{

    constructor(){
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'scooterprueba'
         });
    }

    getConnection(){
        this.conn.connect(function(error){
            if(error){
               throw error;
            }else{
               console.log('Conexion correcta HERMA');
            }
         });
         return this;
    }

    exeQuery(sql){
        this.conn.query(sql, function (err, result) {
            if (err) throw err;
            var resultString = JSON.stringify(result);
            var resultObject = JSON.parse(resultString);
            //let json = resultString.replace('[', ``).replace(']', ``);
            //let jsonObject = JSON.parse(json);
            console.log("Result: " + resultString);
            //res.send(result)
            return resultString;
        });
    }

    /** 
     * @param {} pasa el nombre de la tabla que quieres obtener sus datos
     */
    async getAllFrom(tabla){
        this.getConnection();
        let sql = `SELECT * FROM ${tabla}`;
        let resultString = this.exeQuery(sql);
        return resultString;
    }

 } 

 module.exports = Dbmanager;






















 

/*class User{
    constructor{
        this.st_Nombre = st_Nombre;
        this.i_Edad = i_Edad;
        this.st_Email = st_Email;
        this.st_Password = st_Password;
    }

    async saveUser(){

    }

    async Registrar(){
        connect.query('', )
        console.log(idUser[0].id)
        return  idUser[0].id
    }
}*/



/*const { sequelize }= require("../../config/mysql")
//const sequelize = require("sequelize"); //YA NO ES NECESARIO, SE CONSIGUIO ARRIBA 
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.NUMBER, //poner mas validaciones futuras
        },
        email: { 
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = User;*/