const { prodServCartaPorteModel, direccionOrigenCPModel, direccionDestinoCPModel } = require("../models");

const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");


// CREATE
const createProdServCPCtrl = async (req, res, next) => {
  try {  
    const body =req.body; //la data del request venga curada

    const cfdi = await prodServCartaPorteModel.create(body);
    handleHttpResponse(res, cfdi)
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CREATE_createProdServCP")
  }
};


//READ ALL BY EMPRESA
const readAllByEmpresaProdServCPCtrl = async (req, res) => {
  try {
    let id_Empresa=req.params.id;
    let query = "    SELECT prodserv.* FROM tbl_prodserv_cfdi as prodserv RIGHT JOIN tbl_cfdi as cfdi ON  cfdi.id_CartaPorte = prodserv.id_CartaPorte WHERE cfdi.id_Empresa = :id"
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
const updateProdServCPCtrl = async (req, res) => {
  try {
    let id_CartaPorte = req.params.id_CartaPorte;
    let id_ClaveProducto = req.params.id_prodserv;

    const cfdi = await prodServCartaPorteModel.findOne({
        where: {
          id_CartaPorte,
          id_ClaveProducto
        }
      });
      

    if (!cfdi) {
      return res.status(404).json({ success: false, message: 'ProdServCP not found' });
    }

  

      const updatedCFDI = await prodServCartaPorteModel.update(req.body, {
        where: {
            id_CartaPorte,
            id_ClaveProducto
          }
      });
      

    handleHttpResponse(res, updatedCFDI)
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE
const deleteProdServCPCtrl = async (req, res) => {
  try {
    let id_CartaPorte = req.params.id_CartaPorte;
    let id_ClaveProducto = req.params.id_prodserv;

    await prodServCartaPorteModel.findOne({
        where: {
          id_CartaPorte,
          id_ClaveProducto
        }
      });
      
      await prodServCartaPorteModel.destroy( {where: {
            id_CartaPorte,
            id_ClaveProducto
          }
      });
      
      
    res.json({ success: true, message: 'CartaPorte deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const createProdServOrigenCPCtrl = async (req, res, next) => {
  try {  
    const body =req.body; //la data del request venga curada

    const cfdi = await direccionOrigenCPModel.create(body);
    handleHttpResponse(res, cfdi)
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CREATE_createProdServCP")
  }
};

const createProdServDestinoCPCtrl = async (req, res, next) => {
  try {  
    const body =req.body; //la data del request venga curada

    const cfdi = await direccionDestinoCPModel.create(body);
    handleHttpResponse(res, cfdi)
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CREATE_createProdServCP")
  }
};




module.exports = {
    createProdServCPCtrl,
    readAllByEmpresaProdServCPCtrl,
    //   readAllCFDICtrl,
//   readCFDICtrl,
  updateProdServCPCtrl,
  deleteProdServCPCtrl,
  //   deleteCFDICtrl,
  createProdServOrigenCPCtrl,
createProdServDestinoCPCtrl

};
