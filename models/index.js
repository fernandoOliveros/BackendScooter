const ENGINE_DB = process.env.ENGINE_DB;

const pathDB = ENGINE_DB == "nosql" ? "./nosql" : "./mysql";

const models = {
  usersModel: require(`${pathDB}/users`),
  unidadesModel: require(`${pathDB}/unidades`),
  documentosUnidadesModel: require(`${pathDB}/documentosUnidades`),
  tiposUnidadesModel: require(`${pathDB}/tiposUnidades`),
  coloniasModel: require(`${pathDB}/colonias`),
  operadoresModel: require(`${pathDB}/operadores`),
  documentosOperadoresModel: require(`${pathDB}/documentosOperadores`),
  direccionOperadoresModel: require(`${pathDB}/direccionOperadores`),
  telefonosOperadoresModel: require(`${pathDB}/telefonosOperadores`),
  contactosEmergenciaModel: require(`${pathDB}/contactosEmOperadores`),
};

module.exports = models;
