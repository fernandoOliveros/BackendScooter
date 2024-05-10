const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const CFDI = sequelize.define(
  "rel_viaje_remolque",
  {
    id_CartaPorte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_Viaje: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_Remolque: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  
  },
  {
    timestamps: false,
    tableName: "rel_viaje_remolque",
    timezone: "Mexico_City", // Set timezone to Mexico City***
  }
);

module.exports = CFDI;
