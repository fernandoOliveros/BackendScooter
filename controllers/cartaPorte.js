const { cartaPorteModel,
  direccionOrigenCP, 
  direccionDestinoCPModel  } = require('../models');
const { handleHttpResponse } = require('../utils/handleResponse');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");
const { sequelize } = require("../config/mysql");

// const createCartaPorteCtrl = async (req, res, next ) => {
//   try {

   
//     const body = matchedData(req); //la data del request venga curada
//     console.log("entering controller createCartaPorteCtrl", body, "ending body sample")
//     const cartaPorte = await cartaPorteModel.create(body);
//     const id_CartaPorte = cartaPorte.dataValues.id_CartaPorte;
//     req.body.Ubicaciones.id_CartaPorte = id_CartaPorte;
//     //req.body = req.body;
//     //console.log("printing req.body.Ubicaciones[1].Domicilio", req.body.Ubicaciones[1].Domicilio)
//     next();
//   } catch (error) {
//     console.log(error);
//     handleHttpError(res, 'ERROR_CREATING_CARTAPORTE');
//   }
// };


const createCartaPorteCtrl = async (req, res, next ) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    console.log("entering controller createCartaPorteCtrl", body, "ending body sample")
    const cartaPorte = await cartaPorteModel.create(body);

    handleHttpResponse(res, cartaPorte );
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_CREATING_CARTAPORTE');
  }
};




const updateCartaPorteCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const cartaPorte = await cartaPorteModel.findByPk(id);
    if (!cartaPorte) {
      handleHttpError(res, `No existe CartaPorte con id: ${id}`, 404);
      return;
    }
    await cartaPorte.update(body);
    handleHttpResponse(res, cartaPorte);
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_UPDATING_CARTAPORTE');
  }
};

const readAllCartasPorteCtrl = async (req, res) => {
  try {
    const cartasPorte = await cartaPorteModel.findAll();
    handleHttpResponse(res, cartasPorte);
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_READING_CARTASPORTE');
  }
};


// READ ALL
const readAllByEmpresaCartaPorteCtrl = async (req, res) => {
  try {
    console.log("test")
    let id_Empresa=req.params.id;
    let query = "    SELECT tbl_cartaporte.* FROM tbl_cartaporte LEFT JOIN tbl_cfdi on tbl_cartaporte.id_CFDI = tbl_cfdi.id_CFDI   WHERE tbl_cfdi.id_Empresa = :id"
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


const readOneCartaPorteCtrl = async (req, res, id_CartaPorte_DB) => {
  try {
    const id_CartaPorte_DB = parseInt(req.params.id);
    const dataCFDI = await readCartaPorteCtrl(req, res, id_CartaPorte_DB);
    // console.log(dataCFDI)
    handleHttpResponse(res, dataCFDI); 
    // Handle the dataCFDI as needed
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error on readOneCartaPorteCtrl' });
  }
}

const readCartaPorteCtrl = async (req, res, id_CartaPorte_DB) => {
  try {
    let id_CartaPorte;
    let dataCartaPorte;
    if (id_CartaPorte_DB) {
      id_CartaPorte = id_CartaPorte_DB; // Use the parameter 'id_CartaPorte_DB'
      dataCartaPorte = await getProdServRelatedToCartaPorte(id_CartaPorte_DB);
      return dataCartaPorte;
    } else if (req.params.id) {
      id_CartaPorte = req.params.id; // Use 'req.params.id' from the client request
      dataCartaPorte = await getProdServRelatedToCartaPorte(id_CartaPorte)
      // Return a response to the client
      handleHttpResponse(res, dataCartaPorte); 
      return; // Ensure you return to prevent further execution
    } else {
      res.status(400).json({ success: false, message: 'Missing ID' });
      return; // Ensure you return to prevent further execution
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const deleteCartaPorteCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const cartaPorte = await cartaPorteModel.findByPk(id);
    if (!cartaPorte) {
      handleHttpError(res, `No existe CartaPorte con id: ${id}`, 404);
      return;
    }
    await cartaPorte.destroy();
    handleHttpResponse(res, 'CartaPorte eliminada correctamente.');
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_DELETING_CARTAPORTE');
  }
};



const getProdServRelatedToCartaPorte = async(id_CartaPorte)=>{
  try {
  
    // First query to select columns from tbl_cartaporte to get id_CartaPorte
    const query1 = "SELECT id_CartaPorte FROM tbl_cartaporte WHERE id_CartaPorte = :id";
    const result1 = await sequelize.query(query1, {
      replacements: { id: id_CartaPorte },
      type: sequelize.QueryTypes.SELECT,
    });

    // Check if id_CartaPorte was found in the first query
    if (result1 && result1.length > 0) {
        // Use the id_CartaPorte from the first query in the second query
        const id_CartaPorte = result1[0].id_CartaPorte;

        // Second query to select columns from both tbl_cartaporte and tbl_productoservicio_cartaporte
        const query2 = "SELECT tbl_cartaporte.*, tbl_productoservicio_cartaporte.* FROM tbl_cartaporte LEFT JOIN tbl_productoservicio_cartaporte ON tbl_cartaporte.id_CartaPorte = tbl_productoservicio_cartaporte.id_CartaPorte WHERE tbl_cartaporte.id_CartaPorte = :id";

        const result2 = await sequelize.query(query2, {
          replacements: { id: id_CartaPorte },
          type: sequelize.QueryTypes.SELECT,
        });
        // Combine the results
        const newArray = result2.map((item) => {
          // Transform 'item' and return the result
        return { ...item, id_CartaPorte };
        });
        return newArray;

    }
  } catch (error) {
    console.log(error)
  }
}









module.exports = {
  createCartaPorteCtrl,
  updateCartaPorteCtrl,
  readAllCartasPorteCtrl,
  readCartaPorteCtrl,
  deleteCartaPorteCtrl,
  getProdServRelatedToCartaPorte,
  readOneCartaPorteCtrl,
  readAllByEmpresaCartaPorteCtrl
};
