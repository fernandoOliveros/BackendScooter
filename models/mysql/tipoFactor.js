const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Comprobante = sequelize.define(
  "cat_tipofactor",
  {
    id_TipoFactor: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    c_TipoFactor: {
      type: DataTypes.STRING,
  },

},


  
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'cat_tipofactor'
  }
);

module.exports = Comprobante;
