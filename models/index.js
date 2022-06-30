const ENGINE_DB = process.env.ENGINE_DB;

const pathDB = (ENGINE_DB == 'nosql') ? './nosql' : './mysql';

/*
const pathDB = ()=>{
    if(ENGINE_DB == 'mysql') ? pathDB =='./mysql' :  pathDB =='./nosql' ;
}*/

const models = {
    usersModel: require(`${pathDB}/users`),
}

module.exports = models;