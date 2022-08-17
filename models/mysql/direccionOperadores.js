const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
//cambiar nombre a tbl_docs_unidades
const DireccionOperador = sequelize.define(
  "tbl_dir_operadores",
  {
    id_Dir_Operador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Operador: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    c_codigoPostal: {
      type: DataTypes.STRING,
    },
    id_Estado: {
      type: DataTypes.INTEGER,
    },
    id_Localidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_Municipio: {
      type: DataTypes.INTEGER,
    },
    id_Colonia: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    createdAt: false, //dont add createdAt attribute
    updatedAt: false, // don't add updatedAt attribute
  }
);

module.exports = DireccionOperador;
