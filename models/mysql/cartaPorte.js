const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const CartaPorte = sequelize.define(
  "tbl_cartaporte",
  {
    id_CartaPorte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Viaje: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_CFDI: {
      type: DataTypes.INTEGER,
    },
    folio_int_cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    i_NumTotalMercancias: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    st_LugarExpedicion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "tbl_cartaporte",
  }
);

module.exports = CartaPorte;
