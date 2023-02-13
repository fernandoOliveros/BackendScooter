const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Moneda = sequelize.define(
  "cat_moneda",
  {
    id_TipoMoneda: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    c_Moneda: {
      type: DataTypes.STRING,
  },
  st_Descripcion: {
    type: DataTypes.STRING,
},

},
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'cat_moneda'
  }
);

module.exports = Moneda;
