const ENGINE_DB = process.env.ENGINE_DB;

const pathDB = (ENGINE_DB == 'nosql') ? './nosql' : './mysql';

const models = {
    usersModel: require(`${pathDB}/users`),
    unidadesModel: require(`${pathDB}/unidades`),
    documentosUnidadModel: require(`${pathDB}/unidaddocumentos`),
    storageModel: require(`${pathDB}/storage`)
}

module.exports = models;