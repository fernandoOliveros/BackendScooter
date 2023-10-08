const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const CFDI = sequelize.define(
  "tbl_cfdi",
  {
    id_CFDI: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_Empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    st_RFC_emisor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    st_RFC_receptor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    st_nombre_receptor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    st_nombre_emisor: {
      type: DataTypes.STRING,
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

    id_Moneda: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_FormaPago: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_MetodoPago: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_ClaveProdServCFDI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // id_ClaveUnidadPeso: {
    //   type: DataTypes.BIGINT,
    //   allowNull: true,
    // },
    id_UsoCFDI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_TipoComprobante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Viaje: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_Cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_TipoViaje: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dec_Total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_SubTotal: {
      type: DataTypes.DECIMAL,
      allowNull: true,
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

    dec_BaseTraslado: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    c_ImpuestoTraslado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dec_ImporteTraslado: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    st_TipoFactorTraslado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dec_TasaOCuotaTraslado: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },

    /**TODO: MODULO DE RETENCION | IMPUESTOS */
    dec_BaseRetencion: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    c_ImpuestoRetencion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dec_ImporteRetencion: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    st_TipoFactorRetencion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dec_TasaOCuotaRetencion: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },

    
    st_nombreCrudoXML: {
      type: DataTypes.STRING,
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
    tableName: "tbl_cfdi",
    timezone: 'Mexico_City' // Set timezone to Mexico City***
  }
);

module.exports = CFDI;
