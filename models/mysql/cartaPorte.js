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
    st_Version:{
      type: DataTypes.STRING(10),
      allowNull: true,
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
      allowNull: true,
    },
     /**BORRAR st_LugarExpedicion*/
    i_NumTotalMercancias: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dec_TotalDistRec:{
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_PesoBrutoTotalMercancias:{
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    id_UnidadPeso:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    st_LugarExpedicion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    /**ASEGURADORAS */
    
    id_AseguraMedAmbiente:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_AseguraCarga:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    st_PolizaMedAmbiente:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_AseguraCarga:{
      type: DataTypes.STRING,
      allowNull: true,
    },



    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "tbl_cartaporte",
  }
);

module.exports = CartaPorte;
