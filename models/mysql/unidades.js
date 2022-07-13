const { sequelize }= require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Unidad = sequelize.define(
    'tbl_unidades',
    {
        id_Empresa: {
            type: DataTypes.NUMBER,
        },
        id_Marca : {
            type: DataTypes.NUMBER,
        },
        id_Documento : {
            type: DataTypes.NUMBER,
            allowNull : true, //este se debe llenar posteriormente
        },
        id_TipoUnidad : {
            type: DataTypes.NUMBER,
        },
        id_Candado : {
            type: DataTypes.NUMBER,
        },
        st_PermisoSCT : {
            type: DataTypes.STRING,
        },
        st_Economico : {
            type: DataTypes.STRING,
        },
        i_Año : {
            type : DataTypes.NUMBER,
        },
        st_Placa : {
            type: DataTypes.STRING,
        },
        st_NumMotor : {
            type: DataTypes.STRING,
        },
        st_NumSerie : {
            type: DataTypes.STRING,
        },
        st_NumPoliza : {
            type: DataTypes.STRING,
        },
        date_Mecanico : {
            type: DataTypes.DATE,
        },
        date_Ecologico : {
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: false //se debe especificar para cada modelo, o especificar globalmente desde /../../config/mysql
    }
);

module.exports = Unidad;