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

const readCFDICtrl = async (req, res) => {
  try {
    const id_cfdi = req.params.id;

    // First query to select columns from tbl_cfdi to get id_CFDI
    const query1 = "SELECT id_CFDI FROM tbl_cfdi WHERE id_CFDI = :id";
    const result1 = await sequelize.query(query1, {
      replacements: { id: id_cfdi },
      type: sequelize.QueryTypes.SELECT,
    });

    // Check if id_CFDI was found in the first query
    if (result1 && result1.length > 0) {
      // Use the id_CFDI from the first query in the second query
      const id_CFDI = result1[0].id_CFDI;

      // Second query to select columns from both tbl_cfdi and tbl_prodserv_cfdi
      const query2 = "SELECT tbl_cfdi.*, tbl_prodserv_cfdi.* FROM tbl_cfdi LEFT JOIN tbl_prodserv_cfdi ON tbl_cfdi.id_CFDI = tbl_prodserv_cfdi.id_CFDI WHERE tbl_cfdi.id_CFDI = :id";

      const result2 = await sequelize.query(query2, {
        replacements: { id: id_CFDI },
        type: sequelize.QueryTypes.SELECT,
      });
      // Combine the results
      const newArray = result2.map((item) => {
        // Transform 'item' and return the result
      return { ...item, id_CFDI };
      });


      handleHttpResponse(res, newArray);
    } else {
      // Handle the case where id_CFDI wasn't found
      res.status(404).json({ success: false, message: 'Record not found' });
    }
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
