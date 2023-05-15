const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const DirOrigenCP = sequelize.define(
  "tbl_dir_origen_cartaporte",
  {
    id_DirOrigenCP: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_CartaPorte: {
      type: DataTypes.INTEGER,
    },
    id_Estado: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_Localidad: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_Municipio: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_Colonia: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    st_Calle: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    st_NoExterior: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    st_NoInterior: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    st_RefDomicilio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    st_RemitenteNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    st_IdUbicacion: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "OR000000",
    },
    date_FechaSalida: {
      type: DataTypes.DATE,
    },
    st_RemitenteRFC: {
      type: DataTypes.STRING(12),
    },
  },
  {
    timestamps: false,
    tableName: "tbl_dir_origen_cartaporte",
  }
);

module.exports = DirOrigenCP;
