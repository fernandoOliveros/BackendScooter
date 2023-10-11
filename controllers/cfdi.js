const { CFDI } = require('../models');
//const { Op } = require('sequelize');
const { cfdiModel } = require("../models");

const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");


// CREATE
const createCFDICtrl = async (req, res, next) => {
  try {
    const body =req.body; //la data del request venga curada

    // console.log("\n\n before creating the body", body);
    
    const cfdi = await cfdiModel.create(body);
    handleHttpResponse(res, cfdi)

   } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CREATE_CFDI")
  }
};


// READ ALL
const readAllByEmpresaCFDICtrl = async (req, res) => {
  try {
    console.log("test")
    let id_Empresa=req.params.id;
    let query = "    SELECT * FROM tbl_cfdi  WHERE id_Empresa = :id"
      const result = await sequelize.query(query, {
          replacements: { id: `${id_Empresa}` },
        type: sequelize.QueryTypes.SELECT, // Use the appropriate type
      });
    handleHttpResponse(res, result)

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// READ
const readCFDICtrl = async (req, res) => {
  try {
    let id_cfdi = req.params.id
    let query = "SELECT tbl_cfdi.*, tbl_prodserv_cfdi.* FROM tbl_cfdi LEFT JOIN tbl_prodserv_cfdi ON tbl_cfdi.id_CFDI = tbl_prodserv_cfdi.id_CFDI WHERE tbl_cfdi.id_CFDI =  :id"
    const result = await sequelize.query(query, {
        replacements: { id: `${id_cfdi}` },
        type: sequelize.QueryTypes.SELECT, // Use the appropriate type
      });

    handleHttpResponse(res, result)

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// UPDATE
const updateCFDICtrl = async (req, res) => {
  try {
    const cfdi = await CFDI.findByPk(req.params.id);
    if (!cfdi) {
      return res.status(404).json({ success: false, message: 'CFDI not found' });
    }
    const updatedCFDI = await cfdi.update(req.body);
    res.json({ success: true, data: updatedCFDI });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE
const deleteCFDICtrl = async (req, res) => {
  try {
    const cfdi = await CFDI.findByPk(req.params.id);
    if (!cfdi) {
      return res.status(404).json({ success: false, message: 'CFDI not found' });
    }
    await cfdi.destroy();
    res.json({ success: true, message: 'CFDI deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  createCFDICtrl,
  readAllByEmpresaCFDICtrl,
  readCFDICtrl,
  updateCFDICtrl,
  deleteCFDICtrl,
};
