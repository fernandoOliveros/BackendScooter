const { impuestosAgrupadosCFDIModel } = require("../models");

const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");


// CREATE
const createImpuestosAgrupadosCFDICtrl = async (req, res, next) => {
  try {  
    const body =req.body; //la data del request venga curada
    const cfdi = await impuestosAgrupadosCFDIModel.create(body);
    handleHttpResponse(res, cfdi)
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CREATE_createImpuestosAgrupadosCFDI")
  }
};


const readImpuestosAgrupadosCFDICtrl = async (req, res) => {
  try {
    const { id_CFDI, id_TipoImpuesto, id_TipoFactor } = req.params; // Assuming column names are known
    const cfdi = await CFDI.findByPk({ id_CFDI, id_TipoImpuesto, id_TipoFactor });
    if (!cfdi) {
      return res.status(404).json({ success: false, message: 'ImpuestosAgrupadosCFDI not found' });
    }
    res.json({ success: true, data: cfdi });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// UPDATE
const updateImpuestosAgrupadosCFDICtrl = async (req, res) => {
  try {
    const { id_CFDI, id_TipoImpuesto, id_TipoFactor } = req.params; // Assuming column names are known

    const cfdi = await impuestosAgrupadosCFDIModel.findOne({
        where: {id_CFDI, id_TipoImpuesto, id_TipoFactor }
      });
    if (!cfdi) {
      return res.status(404).json({ success: false, message: 'ImpuestosAgrupadosCFDI not found' });
    }
      const updatedCFDI = await impuestosAgrupadosCFDIModel.update(req.body, {
        where: { id_CFDI, id_TipoImpuesto, id_TipoFactor }
      });
    handleHttpResponse(res, updatedCFDI)
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE
const deleteImpuestosAgrupadosCFDICtrl = async (req, res) => {
  try {
    let id_cfdi = req.params.id_cfdi;
    let id_ClaveImpuestosAgrupadosCFDI = req.params.id_prodserv;

      await impuestosAgrupadosCFDIModel.destroy( {where: {id_CFDI, id_TipoImpuesto, id_TipoFactor  }
      });
      
      
    res.json({ success: true, message: 'CFDI deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  createImpuestosAgrupadosCFDICtrl,
  readImpuestosAgrupadosCFDICtrl,
   updateImpuestosAgrupadosCFDICtrl,
   deleteImpuestosAgrupadosCFDICtrl
};
