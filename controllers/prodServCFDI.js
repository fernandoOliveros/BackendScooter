const { prodServCFDIModel } = require("../models");

const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");


// CREATE
const createProdServCFDICtrl = async (req, res, next) => {
  try {  
    const body =req.body; //la data del request venga curada

    const cfdi = await prodServCFDIModel.create(body);
    handleHttpResponse(res, cfdi)
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CREATE_createProdServCFDI")
  }
};


//READ ALL BY EMPRESA
const readAllByEmpresaProdServCFDICtrl = async (req, res) => {
  try {
    let id_Empresa=req.params.id;
    let query = "    SELECT prodserv.* FROM tbl_prodserv_cfdi as prodserv RIGHT JOIN tbl_cfdi as cfdi ON  cfdi.id_CFDI = prodserv.id_CFDI WHERE cfdi.id_Empresa = :id"
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

// // READ
// const readCFDICtrl = async (req, res) => {
//   try {
//     const cfdi = await CFDI.findByPk(req.params.id);
//     if (!cfdi) {
//       return res.status(404).json({ success: false, message: 'CFDI not found' });
//     }
//     res.json({ success: true, data: cfdi });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server Error' });
//   }
// };

// UPDATE
const updateProdServCFDICtrl = async (req, res) => {
  try {
    let id_cfdi = req.params.id_cfdi;
    let id_ClaveProdServCFDI = req.params.id_prodserv;

    const cfdi = await prodServCFDIModel.findOne({
        where: {
          id_cfdi,
          id_ClaveProdServCFDI
        }
      });
      

    if (!cfdi) {
      return res.status(404).json({ success: false, message: 'prodServCFDI not found' });
    }

  

      const updatedCFDI = await prodServCFDIModel.update(req.body, {
        where: {
            id_cfdi,
            id_ClaveProdServCFDI
          }
      });
      

    handleHttpResponse(res, updatedCFDI)
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE
const deleteProdServCFDICtrl = async (req, res) => {
  try {
    let id_cfdi = req.params.id_cfdi;
    let id_ClaveProdServCFDI = req.params.id_prodserv;

    const cfdi = await prodServCFDIModel.findOne({
        where: {
          id_cfdi,
          id_ClaveProdServCFDI
        }
      });
      
      await prodServCFDIModel.destroy( {where: {
            id_cfdi,
            id_ClaveProdServCFDI
          }
      });
      
      
    res.json({ success: true, message: 'CFDI deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
    createProdServCFDICtrl,
    readAllByEmpresaProdServCFDICtrl,
    //   readAllCFDICtrl,
//   readCFDICtrl,
  updateProdServCFDICtrl,
  deleteProdServCFDICtrl
  //   deleteCFDICtrl,
};
