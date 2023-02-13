const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Comprobante = sequelize.define(
  "cat_tipocomprobante",
  {
    id_TipoComprobante: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    st_TipoComprobante: {
      type: DataTypes.STRING,
  },},
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'cat_tipocomprobante'
  }
);

module.exports = Comprobante;
