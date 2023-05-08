const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

// Middleware Validator
const validateCartaporte = async (req, res, next) => {
  try {
    const { id_Viaje, id_CFDI, folio_int_cp, i_NumTotalMercancias, st_LugarExpedicion } = req.body;
    
    // Check if required fields are present
    if (!id_Viaje || !folio_int_cp || !i_NumTotalMercancias || !st_LugarExpedicion) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Check if id_Viaje exists
    const viaje = await Viaje.findOne({ where: { id_Viaje } });
    if (!viaje) {
      return res.status(404).json({ message: "Invalid id_Viaje" });
    }

    // Check if id_CFDI exists
    if (id_CFDI) {
      const cfdi = await CFDI.findOne({ where: { id_CFDI } });
      if (!cfdi) {
        return res.status(404).json({ message: "Invalid id_CFDI" });
      }
    }

    // Check if folio_int_cp is unique
    const existingCartaporte = await Cartaporte.findOne({ where: { folio_int_cp } });
    if (existingCartaporte) {
      return res.status(409).json({ message: "Duplicate folio_int_cp" });
    }
    
    // If everything is OK, continue
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { Cartaporte, validateCartaporte };
