const Sequelize=require ("sequelize");

const database= process.env.mysql_DB;
const username= process.env.mysql_USERNAME;
const password= process.env.mysql_PASSWORD;
const host= process.env.mysql_HOST;

/*instanciamos la clase que guarda los datos de conexion con la bd*/
const sequelize= new Sequelize (
    database,
    username,
    password,
    {
        host, 
        dialect: "mysql"
    }
)

/*conexion a la base de datos*/
const conexionDBmysql= async() =>{ 
    try {
        await sequelize.authenticate();
        console.log("Conexion exitosa con la base de datos")
        
    } catch (error) {
        console.log('Error de conexion con la base de datos', error)
    }
}


module.exports= {sequelize, conexionDBmysql };