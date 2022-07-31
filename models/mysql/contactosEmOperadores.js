const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Contactos = sequelize.define(
  "tbl_contactoem_operadores",
  {
    id_ContactoEm: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Operador: {
      type: DataTypes.INTEGER,
    },
    st_Nombre: {
      type: DataTypes.STRING,
    },
    st_NumTelefono: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
  }
);

module.exports = Contactos;
