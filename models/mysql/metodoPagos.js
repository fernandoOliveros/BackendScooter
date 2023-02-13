const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const MetodoPagos = sequelize.define(
  "cat_metodopago",
  {
    id_MetodoPago: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    c_MetodoPago: {
      type: DataTypes.STRING,
  },
  st_Descripcion: {
    type: DataTypes.STRING,
},

},
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'cat_metodopago'
  }
);

module.exports = MetodoPagos;
