const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Moneda = sequelize.define(
  "c_regimenfiscal",
  {
    id_RegimenFiscal: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    c_RegimenFiscal: {
      type: DataTypes.NUMBER,
    },
    st_Descripcion: {
    type: DataTypes.STRING,
    },
    Física: {
      type: DataTypes.STRING,
      },
    Moral: {
        type: DataTypes.STRING,
        },

},
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'c_regimenfiscal'
  }
);

module.exports = Moneda;
