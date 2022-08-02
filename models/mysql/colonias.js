const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const tiposUnidades = sequelize.define(
  "cat_colonia",
  {
    id_colonia : {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    c_Colonia: {
      type: DataTypes.STRING,
    },
    c_CodigoPostal: {
      type: DataTypes.STRING,
    },
    st_Colonia: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = tiposUnidades;
