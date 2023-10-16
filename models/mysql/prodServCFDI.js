const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const CFDI = sequelize.define(
  "tbl_prodserv_cfdi",
  {
    id_CFDI: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,

      //autoIncrement: true,
    },
    id_ClaveProdServCFDI:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,

    },



    id_ClaveUnidadPesoCFDI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_ObjetoImp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dec_ImporteConcepto: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_ValorUnitarioConcepto: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    st_DescripcionConcepto: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },    


    
    
    /**TODO: MODULO DE TRASLADO | IMPUESTOS */
    id_ImpuestoTraslado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_TipoFactorTraslado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dec_BaseTraslado: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_ImporteTraslado: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_TasaOCuotaTraslado: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    

    /**TODO: MODULO DE RETENCION | IMPUESTOS */
    id_ImpuestoRetencion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_TipoFactorRetencion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dec_BaseRetencion: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_ImporteRetencion: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_TasaOCuotaRetencion: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    

    /*createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },*/
  },
  {
    timestamps: true,
    tableName: "tbl_prodserv_cfdi",
    timezone: 'Mexico_City' // Set timezone to Mexico City***
  }
);

module.exports = CFDI;
