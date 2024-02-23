const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const ImpuestosAgrupadosCFDI = sequelize.define(
  "tbl_impuestos_agrupados_cfdi",
  {
    id_CFDI: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_TipoImpuesto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_TipoFactor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_TipoImpuesto_RT: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    
    dec_BaseTotal: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    }, dec_ImporteTotal: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    }, dec_TasaOCuota: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },

  },
  {
    timestamps: false, // Set timestamps option to false
    tableName: "tbl_impuestos_agrupados_cfdi",
  }
);

module.exports = ImpuestosAgrupadosCFDI;
