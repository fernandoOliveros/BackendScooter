const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
//const Empresa = require('./empresas');


const Cliente = sequelize.define(
  "tbl_clientes",
  {
    id_Cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    st_RazonSocial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    st_AliasCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_RegimenFiscal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    st_RFC: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    i_Status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    st_PersonaRepresenta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_Celular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_Correo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_Empresa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    c_DomicilioFiscal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  },
  {
    timestamps: false,
    tableName: "tbl_clientes",
  }
);


//Cliente.belongsTo(Empresa, { foreignKey: "id_Empresa" });
module.exports = Cliente;