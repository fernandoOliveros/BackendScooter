const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const CFDI = sequelize.define(
  "tbl_productoservicio_cartaporte",
  {
    id_CartaPorte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,

      //autoIncrement: true,
    },
    id_ClaveProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_ClaveUnidadPeso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_DirDestinoCP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_DirOrigenCP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    i_Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    st_Descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_Dimensiones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dec_PesoEnKg: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    i_MaterialPeligroso: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_MaterialesPeligrosos: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_TipoEmbalaje: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "tbl_productoservicio_cartaporte",
    timezone: "Mexico_City", // Set timezone to Mexico City***
  }
);

module.exports = CFDI;
