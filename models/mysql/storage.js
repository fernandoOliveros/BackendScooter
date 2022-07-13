const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Storage = sequelize.define(
  "tbl_unidaddocumentos",
  {
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

module.exports = Storage;
