const { sequelize }= require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Operador = sequelize.define(
    'tbl_operadores',
    {
        id_Empresa: {
            type: DataTypes.NUMBER,
        },
        id_TipoPuesto : {
            type: DataTypes.NUMBER,
        },
        st_Nombre : {
            type: DataTypes.NUMBER,
        },
        st_ApellidoP : {
            type: DataTypes.NUMBER,
        },
        st_ApellidoM : {
            type: DataTypes.STRING,
        },
        date_Nacimiento : {
            type: DataTypes.STRING,
        },
        st_NumIMSS : {
            type : DataTypes.NUMBER,
        },
        st_CURP : {
            type: DataTypes.STRING,
        },
        st_NumLicencia : {
            type: DataTypes.STRING,
        },
        date_Vigencia : {
            type: DataTypes.STRING,
        },
        i_Status : {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    }
);

module.exports =Operador;