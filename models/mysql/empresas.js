const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
//const Cliente = require('./clientes');

const Empresa = sequelize.define(
  "tbl_empresas",
  {
    id_Empresa : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    st_RazonSocial: {
      type: DataTypes.STRING,
    },
    id_TipoEmpresa: {
      type: DataTypes.INTEGER,
    },
    st_RFC: {
      type: DataTypes.STRING,
    },
    st_ImagenLogo: {
      type: DataTypes.STRING,
    },
    i_Status: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
  }
);
//checar funcion
//Empresa.hasMany(Cliente, { foreignKey: "id_Empresa" });

module.exports = Empresa;
