const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const tiposUnidades = sequelize.define(
  "cat_tipounidades",
  {
    id_TipoUnidad: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    st_ClaveTransporte: {
      type: DataTypes.STRING,
    },
    st_Descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = tiposUnidades;
