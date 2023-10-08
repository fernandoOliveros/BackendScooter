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
    console.log("\n IT'S INSIDE THE CONTROLLER controllers/cfdi/createCFDICtrl")    
    //const body = matchedData(req); //la data del request venga curada
    const body =req.body; //la data del request venga curada

    // console.log("\n\n before creating the body", body);
    
    const cfdi = await cfdiModel.create(body);
    handleHttpResponse(res, cfdi)

    //   req.id_CFDI_database = cfdi.dataValues.id_CFDI;
    // next(); // call the next middleware or route handler
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CREATE_CFDI")
  }
};


// READ ALL
const readAllCFDICtrl = async (req, res) => {
  try {
    const cfdiList = await CFDI.findAll();
    res.json({ success: true, data: cfdiList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// READ
const readCFDICtrl = async (req, res) => {
  try {
    const cfdi = await CFDI.findByPk(req.params.id);
    if (!cfdi) {
      return res.status(404).json({ success: false, message: 'CFDI not found' });
    }
    res.json({ success: true, data: cfdi });
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
  readAllCFDICtrl,
  readCFDICtrl,
  updateCFDICtrl,
  deleteCFDICtrl,
};
