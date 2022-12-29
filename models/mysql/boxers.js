const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Contactos = sequelize.define(
  "tbl_boxers",
  {
    id_Boxer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    st_Name:{
        type: DataTypes.STRING,
    },
    i_Age: {
      type: DataTypes.INTEGER,
    },
    st_Division: {
      type: DataTypes.STRING,
    },
    i_Wins: {
      type: DataTypes.INTEGER,
    },
    i_Losses: {
      type: DataTypes.INTEGER,
    },
    i_Draws: {
        type: DataTypes.INTEGER,
    },
    st_Location: {
        type: DataTypes.STRING,
    },
    i_WorldChampion: {
        type: DataTypes.INTEGER,
    },
    id_Gender: {
        type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
  }
);

module.exports = Contactos;
