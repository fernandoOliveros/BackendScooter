const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
//cambiar nombre a tbl_docs_unidades
const Documentos = sequelize.define(
  "tbl_docs_operadores",
  {
    id_Documento: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Operador: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    url_SolicitudEmpleo: {
      type: DataTypes.STRING,
    },
    url_CURP: {
      type: DataTypes.STRING,
    },
    url_RFC: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url_ComprobanteDom: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: true, //add createdAt attribute
    updatedAt: false, // don't add updatedAt attribute
  }
);

module.exports = Documentos;
