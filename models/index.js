const ENGINE_DB = process.env.ENGINE_DB;

const pathDB = (ENGINE_DB == 'nosql') ? './nosql' : './mysql';

const models = {
    usersModel: require(`${pathDB}/users`),
    unidadesModel: require(`${pathDB}/unidades`),
    documentosModel: require(`${pathDB}/documentos`),
}

module.exports = models;