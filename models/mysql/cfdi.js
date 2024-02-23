const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const CFDI = sequelize.define(
  "tbl_cfdi",
  {
    id_CFDI: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,

    },
    id_Empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    st_nombreCrudoXML: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_RFC_emisor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_RFC_receptor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_nombre_receptor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_nombre_emisor: {
      type: DataTypes.STRING,
      allowNull: true,
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
    dec_Total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_SubTotal: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_Descuento: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    st_nombreCrudoXML: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_LugarExpedicion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    st_CondicionesPago: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    st_CondicionesPago: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    i_Timbrado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dec_TotalImpuestosRetenidos: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    dec_TotalImpuestosTrasladados: {
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
    tableName: "tbl_cfdi",
    timezone: 'Mexico_City' // Set timezone to Mexico City***
  }
);

module.exports = CFDI;
