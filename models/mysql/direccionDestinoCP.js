const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const DirDestinoCP = sequelize.define(
  "tbl_dir_destino_cartaporte",
  {
    id_dir_destinoCP: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_CartaPorte: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Estado: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_Localidad: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    id_Municipio: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    id_Colonia: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    c_codigoPostal: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    st_Calle: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    st_NoExterior: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    st_NoInterior: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    st_RefDomicilio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    st_DestinatarioNombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    st_IdUbicacion: {
      type: DataTypes.STRING(8),
      allowNull: true,
      defaultValue: "DE000000",
    },
    date_FechaLlegada: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    st_DestinatarioRFC: {
      type: DataTypes.STRING(12),
      allowNull: false,

    },
    dec_DistRec: {
      type: DataTypes.DECIMAL(7,2),
    },
  },
  {
    timestamps: false,
    tableName: "tbl_dir_destino_cartaporte",
  }
);

module.exports = DirDestinoCP;
