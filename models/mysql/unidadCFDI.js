const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Comprobante = sequelize.define(
  "cat_cfdi_unidad",
  {
    id_ClaveUnidadPesoCFDI: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    c_ClaveUnidad: {
      type: DataTypes.STRING,
  },
  st_Nombre: {
    type: DataTypes.STRING,
},
st_Descripcion: {
  type: DataTypes.STRING,
},

},


  
  {
    timestamps: false, //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    tableName: 'cat_cfdi_unidad'
  }
);

module.exports = Comprobante;
