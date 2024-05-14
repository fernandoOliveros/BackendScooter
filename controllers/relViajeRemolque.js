const { relViajeRemolqueCPModel } = require("../models");

// const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
// const { QueryTypes } = require("sequelize");


// CREATE
const createViajeRemolqueCtrl = async (req, res, next) => {
  try {  
    const body =req.body; //la data del request venga curada

    const cfdi = await relViajeRemolqueCPModel.create(body);
    handleHttpResponse(res, cfdi)
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CREATE_createViajeRemolqueCtrl")
  }
};

const readViajeRemolqueCtrl = async (req, res) => {
  try {
    const id= parseInt(req.params.id)
    //console.log(`El id ESSSS ${id}`)

    const dataUnidad = await unidadesModel.findByPk(id);
    if (!dataUnidad) {
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `candado`.`st_DescripcionCandado`, `unidades`.*, `docs`.`url_TarjetaCirculacion`, `docs`.`url_Factura` , `docs`.`url_PermisoSCT`,`docs`.`id_Documento` " +
        "FROM `tbl_unidades` as `unidades`" +
        "INNER JOIN `tbl_documentos` as `docs`" +
        " ON `docs`.`id_Unidad`= `unidades`.`id_Unidad`" +
        "INNER JOIN  `tbl_tipocandado` as `candado`" +
        " ON `candado`.`id_Candado`= `unidades`.`id_Candado`" +
        " AND `candado`.`id_Candado`= `unidades`.`id_Candado`" +
        "WHERE `unidades`.`id_Unidad`=:id;";
      const dataUnidadModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataUnidadModified);
    }
  } catch (e) {
    handleHttpError(res, "ERROR_READ_UNIDAD");
  }
};


const updateViajeRemolqueCtrl = async (req, res) => {
  try {  
    const body =req.body; //la data del request venga curada

    const dataUpdatedRemolque = await relViajeRemolqueCPModel.update(body, {
      where: { id_Unidad },
    });

    handleHttpResponse(res, dataUpdatedRemolque)
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_update_ViajeRemolqueCtrl")
  }
};



const deleteViajeRemolqueCtrl = async (req, res) => {
  try {  
    const { id_CartaPorte, id_Viaje, id_Remolque } = req;
    const dataRemolque = await relViajeRemolqueCPModel.findByPk({
      where: {
          id_CartaPorte: id_CartaPorte,
          id_Viaje: id_Viaje,
          id_Remolque: id_Remolque
      }
   });

    if (!dataRemolque) {
      handleHttpError(res, `No existe dataRemolque con id: ${id}`, 404);
      return;
    } else {

      await cartaPorte.destroy();
      handleHttpResponse(res, "Relacion Remolque-CP eliminada correctamente.");

    }


  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_DELETE_viajeRemolqueCtrl")
  }
};


module.exports = {
  createViajeRemolqueCtrl,
  updateViajeRemolqueCtrl,
  deleteViajeRemolqueCtrl, 
  readViajeRemolqueCtrl 
};
