const { check, validationResult } = require("express-validator");


console.log("entering the cfdi validator")

const validatorCreateCFDI = [
  check("id_Empresa").notEmpty(),
  check("id_Moneda").notEmpty(),
  check("id_FormaPago").notEmpty(),
  check("id_MetodoPago").notEmpty(),
  check("id_ClaveProdServCFDI").notEmpty(),
  check("id_ClaveUnidadPeso").notEmpty(),
  check("id_UsoCFDI").notEmpty(),
  check("id_TipoComprobante").notEmpty(),
  check("id_Viaje").notEmpty(),
  check("id_Cliente").notEmpty(),
  check("id_TipoViaje").notEmpty(),
  (req, res, next) => {
    console.log("Entering array of errors validationResult")
    console.log("\n this is what we got from Request body:", req.body); 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validatorCreateCFDI };
