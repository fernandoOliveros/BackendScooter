const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { viajeModel, empresasModel } = require("../models");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

/**
 * @param {} req  http://localhost:5000/api/Viajes/...
 * @param {*} res   Query de la operacion
 */

const createViajeCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    console.log("entering createViajeCtrl");
    const dataViaje = await viajeModel.create(body);
    handleHttpResponse(res, dataViaje);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_Viaje");
  }
};

const updateViajesCtrl = async (req, res) => {
  try {
    let id_Viaje = parseInt(req.params.id);
    const { body } = req; //splits the request into two objects, id and body
    let query =
      "SELECT `id_Viaje`" + "FROM `tbl_viaje`" + "WHERE `id_Viaje` =:id;";
    let dataId = await sequelize.query(query, {
      replacements: { id: `${id_Viaje}` },
      type: QueryTypes.SELECT,
    });
    if (!dataId) {
      handleHttpError(res, `No existe Viaje con id: ${id}`, 404);
      return;
    } else {
      const dataUpdatedViaje = await viajeModel.update(body, {
        where: { id_Viaje },
      });

      let dataRow = await viajeModel.findByPk(id_Viaje);
      dataRow = { dataRow, status: `${dataUpdatedViaje}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_Viaje");
  }
};

// const readAllViajesCtrl = async (req, res) => {
//   try {
//     let query = "SELECT `candado`.`st_DescripcionCandado`, `Viajes`.*"+
//     "FROM `tbl_Viajes` as `Viajes`" +
//     "LEFT JOIN  `tbl_tipocandado` as `candado`" +
//     "ON `candado`.`id_Candado`= `Viajes`.`id_Candado`" +
//     "WHERE  `Viajes`.`id_Candado` = 1" ;
//     const readAllViajes = await sequelize.query(query, {
//       type: QueryTypes.SELECT
//     })
//     //const dataAllViajes = await viajeModel.findAll();
//     handleHttpResponse(res, readAllViajes);
//   } catch (e) {
//     console.log(e);
//     handleHttpError(res, "ERROR_READ_Viajes");
//   }
// };

async function getLatestFolio(req, res) {
  try {
    const id = parseInt(req.params.id);
    //console.log("id", id)
    let query =
      "SELECT max(`folio_int_viaje`) as `id_latest_folio`  from `tbl_viaje` WHERE `id_Empresa`=:id;";
    const latest_folio_data = await sequelize.query(query, {
      replacements: { id: `${id}` },
      type: QueryTypes.SELECT,
    });
    let latest_folio = latest_folio_data.pop();
    handleHttpResponse(res, latest_folio);
  } catch (e) {
    console.log("Probably wrong id_Empresa (inexistent)");
  }
}

const deleteViajeCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataViaje = await viajeModel.findByPk(id);
    if (!dataViaje) {
      handleHttpError(res, `No existe Viaje con id: ${id}`, 404);
      return;
    } else {
      let query =
        "UPDATE `tbl_viaje` SET `id_Candado`='0' WHERE `id_Viaje`=:id;";
      const statusDeleteViaje = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.UPDATE,
      });
      let getLogicStatus = statusDeleteViaje.pop();
      let dataRow = await viajeModel.findByPk(id);
      dataRow = { dataRow, status: `${getLogicStatus}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_Viaje");
  }
};

// const readViajeEmpresaCtrl = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id)
//     const dataEmpresa = await empresasModel.findByPk(id);
//     if (!dataEmpresa) {
//       handleHttpError(res, `No existe empresa con id: ${id}`, 404);
//       return;
//     } else {
//       let query =
//         " SELECT `viaje`.*, `empresa`.`id_Empresa`, `unidades`.`st_Economico` as st_EconomicoUnidad, `operadores`.`st_Nombre`, operadores.st_ApellidoP, remolques.st_Economico as st_EconomicoRemolque FROM `tbl_viaje` as `viaje` LEFT JOIN  `tbl_empresas` as `empresa` ON `empresa`.`id_Empresa`= `viaje`.`id_Empresa` LEFT JOIN  `tbl_unidades` as `unidades` ON `unidades`.`id_Unidad`= `viaje`.`id_Unidad` LEFT JOIN  `tbl_operadores` as `operadores` ON `operadores`.`id_Operador`= `viaje`.`id_Operador` LEFT JOIN  `tbl_remolques` as `remolques` ON `remolques`.`id_Remolque`= `viaje`.`id_Remolque` WHERE `empresa`.`id_Empresa`=:id AND `viaje`.`id_Candado`= 1 AND `viaje`.`id_StatusViaje`= 1" ;
//       const dataViajeModified = await sequelize.query(query, {
//         replacements: { id: `${id}` },
//         type: QueryTypes.SELECT,
//       });

//       const dataViajeModifiedLength = dataViajeModified.Length;
//       console.log("dataViajeModifiedLength", dataViajeModifiedLength)

//        // Iterate over each element in dataViajeModified
//        dataViajeModified.forEach(async (viaje) => {
//         // Add HasCFDI property based on the condition
//         viaje.HasCFDI = false; // Set the default value
//         let idViaje=viaje.id_Viaje;

//         let verifyCfdiExistanceQuery= "SELECT * FROM `tbl_cfdi` RIGHT JOIN `tbl_viaje` ON `tbl_viaje`.`id_Viaje` = `tbl_cfdi`.`id_Viaje` WHERE `tbl_cfdi`.`id_Viaje`=:id ";
//         const verifyCfdiExistanceQueryResult = await sequelize.query(verifyCfdiExistanceQuery, {
//           replacements: { id: `${idViaje}` },
//           type: QueryTypes.SELECT,
//         });

//         if (verifyCfdiExistanceQueryResult)

//         // const cfdiInformation = await sequelize.query(verifyCfdiExistanceQuery, {
//         //   replacements: { id: viaje.id_Viaje },
//         //   type: QueryTypes.SELECT,
//         // });

//        }

//       handleHttpResponse(res, dataViajeModified);
//     }
//   } catch (e) {
//     console.log(e);
//     handleHttpError(res, "ERROR_READ_viaje-EMPRESA");
//   }
// };

const readViajeEmpresaCtrl = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataEmpresa = await empresasModel.findByPk(id);
    if (!dataEmpresa) {
      handleHttpError(res, `No existe empresa con id: ${id}`, 404);
      return;
    } else {
      let query =
        " SELECT `viaje`.*, `empresa`.`id_Empresa`, `unidades`.`st_Economico` as st_EconomicoUnidad, `operadores`.`st_Nombre`, operadores.st_ApellidoP FROM `tbl_viaje` as `viaje` LEFT JOIN  `tbl_empresas` as `empresa` ON `empresa`.`id_Empresa`= `viaje`.`id_Empresa` LEFT JOIN  `tbl_unidades` as `unidades` ON `unidades`.`id_Unidad`= `viaje`.`id_Unidad` LEFT JOIN  `tbl_operadores` as `operadores` ON `operadores`.`id_Operador`= `viaje`.`id_Operador`  WHERE `empresa`.`id_Empresa`=:id AND `viaje`.`id_Candado`= 1";
      const dataViajeModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });

      for (const viajeInfo of dataViajeModified){
        viajeInfo.remolques= await getRemolquesByViajeCtrl(viajeInfo.id_Viaje)
      }


      handleHttpResponse(res, dataViajeModified);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_viaje-EMPRESA");
  }
};

const getRemolquesByViajeCtrl = async (id_Viaje) => {
  try {
    const dataViaje = await viajeModel.findByPk(id_Viaje);
    if (!dataViaje) {
      handleHttpError(res, `No existe viaje con id: ${id_Viaje}`, 404);
      return;
    } else {
      let query =
        "SELECT tbl_remolques.st_Economico FROM tbl_remolques RIGHT JOIN( SELECT rel_viaje_remolque.id_Remolque FROM tbl_viaje RIGHT JOIN rel_viaje_remolque ON rel_viaje_remolque.id_Viaje = tbl_viaje.id_Viaje LEFT JOIN tbl_empresas ON tbl_empresas.id_Empresa = tbl_viaje.id_Empresa WHERE tbl_viaje.id_Viaje=:id ) AS remolques_by_empresa ON remolques_by_empresa.id_Remolque = tbl_remolques.id_Remolque;";

      const dataRemolquesByViaje = await sequelize.query(query, {
        replacements: { id: `${id_Viaje}` },
        type: QueryTypes.SELECT,
      });

      const remolquesArray = [];
      for (const remolque of dataRemolquesByViaje){
        remolquesArray.push(remolque)
        // console.log("remolque:", remolque)

      }
      console.log("final remolquesArray:", remolquesArray)
      return remolquesArray;
      
    }
  } catch (e) {
    console.log("Error at getRemolquesByViajeCtrl ", e);
  }
};


const readViajeActivoEmpresaCtrl = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataEmpresa = await empresasModel.findByPk(id);
    if (!dataEmpresa) {
      handleHttpError(res, `No existe empresa con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `viaje`.*, `empresa`.`id_Empresa`, `unidades`.`st_Economico` as st_EconomicoUnidad, `operadores`.`st_Nombre`, operadores.st_ApellidoP FROM `tbl_viaje` as `viaje` LEFT JOIN  `tbl_empresas` as `empresa` ON `empresa`.`id_Empresa`= `viaje`.`id_Empresa` LEFT JOIN  `tbl_unidades` as `unidades` ON `unidades`.`id_Unidad`= `viaje`.`id_Unidad` LEFT JOIN  `tbl_operadores` as `operadores` ON `operadores`.`id_Operador`= `viaje`.`id_Operador` WHERE `empresa`.`id_Empresa`=:id AND `viaje`.`id_Candado`= 1 AND `viaje`.`id_StatusViaje`= 1";

      const dataViajeModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });

      for (const viajeInfo of dataViajeModified){
        viajeInfo.remolques= await getRemolquesByViajeCtrl(viajeInfo.id_Viaje)
      }



      const dataViajeModifiedLength = dataViajeModified.length;
      console.log("dataViajeModifiedLength", dataViajeModifiedLength);

      // Iterate over each element in dataViajeModified
      for (const viaje of dataViajeModified) {
        // Add HasCFDI property based on the condition
        viaje.HasCFDI = false; // Set the default value
        const idViaje = viaje.id_Viaje;

        let verifyCfdiExistanceQuery =
"SELECT `tbl_cfdi`.st_LugarExpedicion, `tbl_cfdi`.i_Timbrado, `tbl_cfdi`.id_CFDI, `tbl_cfdi`.dec_Total, `tbl_cfdi`.`dec_Total`, `tbl_clientes`.* FROM `tbl_cfdi` RIGHT JOIN `tbl_viaje` ON `tbl_viaje`.`id_Viaje` = `tbl_cfdi`.`id_Viaje` RIGHT JOIN `tbl_clientes` ON `tbl_clientes`.`id_Cliente` = `tbl_cfdi`.`id_Cliente` WHERE `tbl_cfdi`.`id_Viaje`=:id";
        const verifyCfdiExistanceQueryResult = await sequelize.query(
          verifyCfdiExistanceQuery,
          {
            replacements: { id: `${idViaje}` },
            type: QueryTypes.SELECT,
          }
        );

        await getRemolquesByViajeCtrl(idViaje);
        

        if (
          verifyCfdiExistanceQueryResult &&
          verifyCfdiExistanceQueryResult.length > 0
        ) {
          // Do something if verifyCfdiExistanceQueryResult exists
          viaje.HasCFDI = true;
          // You can also store additional information in CfdiInformation here
          viaje.CfdiInformation = verifyCfdiExistanceQueryResult;

          // Check if each Cfdi has a related Carta Porte
          for (const cfdi of viaje.CfdiInformation) {
            let verifyCartaPorteExistanceQuery =
              "SELECT * FROM `tbl_cartaporte` WHERE `id_CFDI`=:id ";
            const verifyCartaPorteExistanceQueryResult = await sequelize.query(
              verifyCartaPorteExistanceQuery,
              {
                replacements: { id: `${cfdi.id_CFDI}` },
                type: QueryTypes.SELECT,
              }
            );

            if (
              verifyCartaPorteExistanceQueryResult &&
              verifyCartaPorteExistanceQueryResult.length > 0
            ) {
              cfdi.HasCartaPorte = true;
              cfdi.CartaPorteInformation = verifyCartaPorteExistanceQueryResult;
            } else {
              cfdi.HasCartaPorte = false;
            }
          }
        }
      }

      handleHttpResponse(res, dataViajeModified);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_viaje-EMPRESA");
  }
};

const readViajeCtrl = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataEmpresa = await viajeModel.findByPk(id);
    if (!dataEmpresa) {
      handleHttpError(res, `No existe viaje con id: ${id}`, 404);
      return;
    } else {
      handleHttpResponse(res, dataEmpresa);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_viaje");
  }
};

module.exports = {
  createViajeCtrl,
  //  readAllViajesCtrl,
  readViajeCtrl,
  updateViajesCtrl,
  deleteViajeCtrl,
  readViajeEmpresaCtrl,
  getLatestFolio,
  readViajeActivoEmpresaCtrl,
};
