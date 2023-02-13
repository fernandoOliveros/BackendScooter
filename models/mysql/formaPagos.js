
const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const FormaPagos = sequelize.define(
  "cat_formapago",
  {
    id_FormaPago: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    c_FormaPago: {
      type: DataTypes.STRING,
    },
    st_Descripcion: {
    type: DataTypes.STRING,
},
},
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'cat_formapago'
  }
);

module.exports = FormaPagos;
