const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Documentos = sequelize.define(
  "tbl_documentos",
  {
    id_Documento : {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Unidad: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    url_TarjetaCirculacion: {
      type: DataTypes.STRING,
    },
    url_Factura: {
      type: DataTypes.STRING,
    },
    url_PermisoSCT: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false, // don't add updatedAt attribute
  }
);

module.exports = Documentos;
