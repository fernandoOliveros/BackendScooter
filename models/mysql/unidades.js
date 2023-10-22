const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Unidad = sequelize.define(
  "tbl_unidades",
  {
    id_Unidad: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Empresa: {
      type: DataTypes.NUMBER,
    },
    id_TipoUnidad: {
      type: DataTypes.NUMBER,
    },
    id_Candado: {
      type: DataTypes.STRING,
    },
    st_Marca: {
      type: DataTypes.STRING,
    },
    st_SubMarca: {
      type: DataTypes.STRING,
    },
    st_PermisoSCT: {
      type: DataTypes.STRING,
    },
    st_Economico: {
      type: DataTypes.STRING,
    },
    st_Anio: {
      type: DataTypes.STRING,
    },
    st_Placa: {
      type: DataTypes.STRING,
    },
    st_NumMotor: {
      type: DataTypes.STRING,
    },
    st_NumSerie: {
      type: DataTypes.STRING,
    },
    st_NumPoliza: {
      type: DataTypes.STRING,
    },
    date_Mecanico: {
      type: DataTypes.DATE,
    },
    date_Ecologico: {
      type: DataTypes.DATE,
    },
    id_TipoPermiso: {
      type: DataTypes.NUMBER,
    },
  },
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
  }
);

module.exports = Unidad;
