const Sequelize=require ("sequelize");

const database= process.env.mysql_DB;
const username= process.env.mysql_USERNAME;
const password= process.env.mysql_PASSWORD;
const host= process.env.mysql_HOST;

//instanciamos la clase que guarda los datos de conexion con la bd
const sequelize= new Sequelize (
    database,
    username,
    password,
    {
        host, 
        dialect: "mysql"
    }
)

sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database');
  });

module.exports= {
    //conexionDBmysql,
     sequelize };