const { sequelize }= require("../../config/mysql")
//const sequelize = require("sequelize"); //YA NO ES NECESARIO, SE CONSIGUIO ARRIBA 
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "users",
    {
        st_Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        i_Edad: {
            type: DataTypes.NUMBER, //poner mas validaciones futuras
        },
        st_Email: { 
            type: DataTypes.STRING
        },
        st_Password: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = User;