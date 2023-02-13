const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const UsosCFDI = sequelize.define(
  "cat_cfdi_uso",
  {
    id_UsoCFDI: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    c_UsoCFDI: {
      type: DataTypes.STRING,
  },
  st_Descripcion: {
    type: DataTypes.STRING,
},

},
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'cat_cfdi_uso'
  }
);

module.exports = UsosCFDI;
