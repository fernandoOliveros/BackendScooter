const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Telefonos = sequelize.define(
  "tbl_tel_operadores",
  {
    id_NumTelefono: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Categoria: {
      type: DataTypes.INTEGER,
    },
    id_Operador: {
      type: DataTypes.INTEGER,
    },
    st_NumTelefono: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
  }
);

module.exports = Telefonos;
