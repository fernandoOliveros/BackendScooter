const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Comprobante = sequelize.define(
  "cat_objetoimp",
  {
    id_ObjetoImp: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    st_descripcion: {
      type: DataTypes.STRING,
  },
  c_ObjetoImp: {
    type: DataTypes.STRING,
},},


  
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'cat_objetoimp'
  }
);

module.exports = Comprobante;
