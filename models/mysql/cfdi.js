const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const CFDI = sequelize.define(
  "tbl_cfdi",
  {
    id_CFDI: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Moneda: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_FormaPago: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_MetodoPago: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_ClaveProdServCFDI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_ClaveUnidadPeso: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_UsoCFDI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_TipoComprobante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Viaje: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_Cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_TipoViaje: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    /*createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },*/
  },
  {
    timestamps: true,
    tableName: "tbl_cfdi",
    timezone: 'Mexico_City' // Set timezone to Mexico City***
  }
);

module.exports = CFDI;
