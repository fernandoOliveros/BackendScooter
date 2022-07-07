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