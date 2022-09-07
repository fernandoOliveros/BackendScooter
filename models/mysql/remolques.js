const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Remolque = sequelize.define(
  "tbl_remolques",
  {
    id_Remolque: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_TipoRemolque:{
      type: DataTypes.INTEGER,
    },
    id_Empresa: {
      type: DataTypes.INTEGER,
    },
    st_Anio: {
      type: DataTypes.STRING,
    },
    st_Marca: {
      type: DataTypes.STRING,
    },
    st_Placa: {
      type: DataTypes.STRING,
    },
    st_NumSerie: {
      type: DataTypes.STRING,
    },
    date_VigenciaFM: {
      type: DataTypes.DATE,
    },
    i_Status:{
      type: DataTypes.TINYINT,
    },

  },
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
  }
);

module.exports = Remolque;
