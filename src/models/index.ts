//const ENGINE_DB = process.env.ENGINE_DB;
//const pathDB = (ENGINE_DB == 'nosql') ? './nosql' : './mysql';

const models = {
    usersModel : require(`$./users`),
    unidadesModel: require(`./unidades`),
    //documentosModel: require(`${pathDB}/documentos`),
    //tiposUnidadesModel: require(`${pathDB}/tiposUnidades`),
}

export default models;
//module.exports = models;