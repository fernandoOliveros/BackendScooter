const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Documentos = sequelize.define(
  "tbl_docs_remolques",
  {
    id_Documento : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Remolque: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
    url_TarjetaCirculacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url_Factura: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url_PermisoSCT: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true, // don't add updatedAt attribute
  }
);

module.exports = Documentos;
