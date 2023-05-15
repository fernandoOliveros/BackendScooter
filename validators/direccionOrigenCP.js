const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorDirOrigenCartaPorte = [
  check("id_CartaPorte").exists(),
  check("id_Estado").exists(),
  check("id_Localidad").exists(),
  check("id_Municipio").exists(),
  check("id_Colonia").exists(),
  check("st_Calle").exists(),
  check("st_NoExterior").exists(),
  check("st_NoInterior").exists(),
  check("st_RefDomicilio").exists(),
  check("st_RemitenteNombre").exists(),
  check("st_IdUbicacion").exists(),
  check("date_FechaSalida").exists(),
  check("st_RemitenteRFC").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorDirOrigenCartaPorte };
