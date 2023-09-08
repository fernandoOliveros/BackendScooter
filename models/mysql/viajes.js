const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Viaje = sequelize.define(
  "tbl_viaje",
  {
    id_Viaje: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    folio_int_viaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_TipoViaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Unidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Operador: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Remolque: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    i_km_totales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_StatusViaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Use the current timestamp as the default value
    },

  },
  {
    timestamps: false, // Set timestamps option to false
    tableName: "tbl_viaje",
  }
);

module.exports = Viaje;
