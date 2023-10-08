const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Comprobante = sequelize.define(
  "cat_impuesto",
  {
    id_Impuesto: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    st_Descripcion: {
      type: DataTypes.STRING,
  },
  c_Impuesto: {
    type: DataTypes.STRING,
},},


  
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'cat_impuesto'
  }
);

module.exports = Comprobante;
