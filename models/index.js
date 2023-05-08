const ENGINE_DB = process.env.ENGINE_DB;

const pathDB = ENGINE_DB == "nosql" ? "./nosql" : "./mysql";

const models = {
  usersModel: require(`${pathDB}/users`),
  unidadesModel: require(`${pathDB}/unidades`),
  documentosUnidadesModel: require(`${pathDB}/documentosUnidades`),
  tiposUnidadesModel: require(`${pathDB}/tiposUnidades`),
  operadoresModel: require(`${pathDB}/operadores`),
  documentosOperadoresModel: require(`${pathDB}/documentosOperadores`),
  direccionOperadoresModel: require(`${pathDB}/direccionOperadores`),
  telefonosOperadoresModel: require(`${pathDB}/telefonosOperadores`),
  contactosEmergenciaModel: require(`${pathDB}/contactosEmOperadores`),
  empresasModel: require(`${pathDB}/empresas`),
  remolquesModel : require(`${pathDB}/remolques`),
  documentosRemolquesModel: require(`${pathDB}/documentosRemolques`),
  tiposComprobantesModel: require(`${pathDB}/tiposComprobantes`),
  tiposMonedasModel: require(`${pathDB}/tiposMonedas`),
  regimenFiscalModel :require(`${pathDB}/regimenFiscal`),
  metodoPagosModel :require(`${pathDB}/metodoPagos`),
  formaPagosModel :require(`${pathDB}/formaPagos`),
  usosCFDIModel :require(`${pathDB}/usosCFDI`),
  clientesModel :require(`${pathDB}/clientes`),
  cfdiModel :require(`${pathDB}/cfdi`),
  cartaPorteModel :require(`${pathDB}/cartaPorte`)
  
  

  
};

module.exports = models;
