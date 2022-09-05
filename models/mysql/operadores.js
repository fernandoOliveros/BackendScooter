const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Operador = sequelize.define(
  "tbl_operadores",
  {
    id_Operador: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Candado: {
      type: DataTypes.STRING,
    },
    id_Empresa: {
      type: DataTypes.NUMBER,
    },
    id_TipoPuesto: {
      type: DataTypes.NUMBER,
    },
    st_Nombre: {
      type: DataTypes.STRING,
    },
    st_ApellidoP: {
      type: DataTypes.STRING,
    },
    st_ApellidoM: {
      type: DataTypes.STRING,
    },
    date_Nacimiento: {
      type: DataTypes.DATE,
    },
    st_NumIMSS: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_RFC: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_CURP: {
      type: DataTypes.STRING,
    },
    st_NumLicencia: {
      type: DataTypes.STRING,
    },
    date_LicenciaVigencia: {
      type: DataTypes.STRING,
    },
    i_Status: {
      type: DataTypes.NUMBER,
    },
  },
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
  }
);

module.exports = Operador;
