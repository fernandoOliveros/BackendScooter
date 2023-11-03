/***
 * IMPORTANDO LIBRERIAS PARA HACER QUERIES
 */
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
var xml2js = require("xml2js");

const { readCFDICtrl } = require("../controllers/cfdi");

const xmlbuilder = require("xmlbuilder");

/******Se invocan las tablas/modelos necesarias para los queries*********/
const {
  tiposComprobantesModel,
  tiposMonedasModel,
  regimenFiscalModel,
  metodoPagosModel,
  formaPagosModel,
  usosCFDIModel,
  unidadCFDIModel,
  objImpModel,
  cfdiModel,
  prodServCFDIModel,
  empresasModel,

} = require("../models");

/******Install the fs  library to  create the file cfdi_YYYY-MM-DD_HH-mm-ss.xml*********/
var fs = require("fs");
const moment = require("moment"); // Install the moment library to format the date and time

async function validate_DomicilioFigura(id_Operador) {
  try {
    let query = `SELECT tbl_dir_operadores.id_Dir_Operador FROM tbl_operadores
      LEFT JOIN tbl_dir_operadores on tbl_dir_operadores.id_Operador = tbl_operadores.id_Operador
       WHERE tbl_operadores.id_Operador = :id`;
    let id_Domicilio = await sequelize.query(query, {
      replacements: { id: `${id_Operador}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    console.log(`id_Domicilio lenght is ${id_Domicilio.length}`); // Access the returned rows
    return id_Domicilio.length;
  } catch (error) {
    console.error("Error querying SQL table tbl_unidades:", error);
  }
}

async function getAutotransporteInfo(id_Unidad) {
  try {
    let query = `SELECT tbl_unidades.*, cat_tipopermiso.st_Clave  FROM tbl_unidades
      LEFT JOIN cat_tipopermiso ON tbl_unidades.id_TipoPermiso = cat_tipopermiso.id_TipoPermiso
      WHERE tbl_unidades.id_Unidad = :id `;

    let UnidadInformation = await sequelize.query(query, {
      replacements: { id: `${id_Unidad}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    return UnidadInformation;
  } catch (error) {
    console.error("Error querying SQL table tbl_unidades:", error);
  }
}

async function getRemolqueInfo(id_Remolque) {
  try {
    let query = `SELECT tbl_remolques.st_Placa, cat_tiporemolque.st_ClaveRemolque  FROM tbl_remolques
      LEFT JOIN cat_tiporemolque 
      ON tbl_remolques.id_TipoRemolque = cat_tiporemolque.id_TipoRemolque
      WHERE tbl_remolques.id_Remolque = :id `;

    let RemolqueInformation = await sequelize.query(query, {
      replacements: { id: `${id_Remolque}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    //console.log(RemolqueInformation)
    return RemolqueInformation;
  } catch (error) {
    console.error("Error querying SQL table tbl_remolques:", error);
  }
}

async function createTimestampedXmlFile(xml) {
  //var timestamp = Date.now();
  const timestamp = moment().subtract(1, "hour").format("YYYY-MM-DD_HH-mm-ss");
  let xmlFileName = `cfdi_${timestamp}.xml`;
  fs.writeFile(`./storage/documentos/${xmlFileName}`, xml, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`\nFile cfdi_${timestamp}.xml created successfully.`);
  });
  return xmlFileName;
}

async function getLocalidad(id_localidad) {
  try {
    // Query the SQL table

    let query = `SELECT c_Localidad FROM cat_localidad WHERE id_Localidad = :id`;
    let c_localidad = await sequelize.query(query, {
      replacements: { id: `${id_localidad}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    // console.log(`c_localidad is ${c_localidad}`); // Access the returned rows

    let firstRowValue = c_localidad[0].c_Localidad;
    // console.log(`First row value: ${firstRowValue}`);
    return firstRowValue;
  } catch (error) {
    console.error("Error querying SQL table:", error);
  }
}
async function getClaveProdServCFDI(id_ClaveProdServCFDI) {
  try {
    let query = `SELECT c_ClaveProdServ FROM cat_cfdi_prodserv WHERE id_ClaveProdServCFDI = :id`;
    let c_ClaveProdServCFDI = await sequelize.query(query, {
      replacements: { id: `${id_ClaveProdServCFDI}` },
      type: QueryTypes.SELECT,
    });

    // console.log(`c_ClaveProdServCFDI is ${c_ClaveProdServCFDI}`); // Access the returned rows

    let firstRowValue = c_ClaveProdServCFDI[0].c_ClaveProdServ;

    // console.log(`First row value c_ClaveProdServCFDI: ${firstRowValue}`);
    return firstRowValue;
  } catch (e) {
    console.error("Error querying SQL table cat_cfdi_prodserv:", e);
  }
}

async function getClaveUnidad(id_ClaveUnidadPeso) {
  try {
    // Query the SQL table

    let query = `SELECT st_ClaveUnidad FROM cat_claveunidadpeso WHERE id_ClaveUnidadPeso = :id`;
    let st_ClaveUnidad = await sequelize.query(query, {
      replacements: { id: `${id_ClaveUnidadPeso}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    console.log(`st_ClaveUnidad is ${st_ClaveUnidad}`); // Access the returned rows

    let firstRowValue = st_ClaveUnidad[0].st_ClaveUnidad;
    console.log(`First row value: ${firstRowValue}`);
    return firstRowValue;
  } catch (error) {
    console.error("Error querying SQL table cat_claveunidadpeso:", error);
  }
}

async function getColonia(id_colonia) {
  try {
    // Query the SQL table

    let query = `SELECT c_Colonia FROM cat_colonia WHERE id_colonia = :id`;
    let c_colonia = await sequelize.query(query, {
      replacements: { id: `${id_colonia}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    let firstRowValue = c_colonia[0].c_Colonia;
    return firstRowValue;
  } catch (error) {
    console.error("Error querying SQL table cat_colonia:", error);
  }
}

async function getEstado(id_estado) {
  try {
    // Query the SQL table

    let query = `SELECT c_Estado FROM cat_estado WHERE id_Estado = :id`;
    let c_Estado = await sequelize.query(query, {
      replacements: { id: `${id_estado}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    let firstRowValue = c_Estado[0].c_Estado;
    return firstRowValue;
  } catch (error) {
    console.error("Error querying SQL table cat_estado:", error);
  }
}

async function getMunicipio(id_municipio) {
  try {
    // Query the SQL table

    let query = `SELECT c_Municipio FROM cat_municipio WHERE id_Municipio = :id`;
    let c_Municipio = await sequelize.query(query, {
      replacements: { id: `${id_municipio}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    let firstRowValue = c_Municipio[0].c_Municipio;
    return firstRowValue;
  } catch (error) {
    console.error("Error querying SQL table cat_municipio:", error);
  }
}

async function getCodigoPostal(id_codigopostal) {
  try {
    // Query the SQL table

    let query = `SELECT c_codigoPostal FROM cat_codigo_postal WHERE id_codigoPostal = :id`;
    let c_codigoPostal = await sequelize.query(query, {
      replacements: { id: `${id_codigopostal}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    let firstRowValue = c_codigoPostal[0].c_codigoPostal;
    return firstRowValue;
  } catch (error) {
    console.error("Error querying SQL table cat_codigo_Postal:", error);
  }
}

async function getIdTipoFigura(id_TipoFigura) {
  try {
    // Query catalog of tipos de figura by the id given on the postman request
    let query = `SELECT st_ClaveFiguraTransporte FROM cat_tipofigura WHERE id_TipoFigura = :id`;
    let st_ClaveFiguraTransporte_query_result = await sequelize.query(query, {
      replacements: { id: `${id_TipoFigura}` },
      type: QueryTypes.SELECT,
    });

    // Process the query result
    let firstRowValue_TipoFigura =
      st_ClaveFiguraTransporte_query_result[0].st_ClaveFiguraTransporte;
    return firstRowValue_TipoFigura;
  } catch (error) {
    throw new Error(
      `Fixed ERROR: Failed to query the catalog cat_tipofigura: ${error.message}\nsurely you're inserting an id that doesn't match the ids on the catalog`
    );
  }
}

async function getOperadorInformation(id_Operador) {
  try {
    let query = `SELECT tbl_operadores.*, cat_tipofigura.st_ClaveFiguraTransporte, cat_estado.c_Estado, cat_estado.c_Pais,
    cat_municipio.c_Municipio , tbl_dir_operadores.c_codigoPostal,tbl_dir_operadores.st_Calle, 
    cat_colonia.c_colonia, cat_localidad.c_Localidad
    FROM tbl_operadores
    LEFT JOIN cat_tipofigura on tbl_operadores.id_TipoFigura= cat_tipofigura.id_TipoFigura
    LEFT JOIN tbl_dir_operadores on tbl_dir_operadores.id_Operador = tbl_operadores.id_Operador
    LEFT JOIN cat_estado ON tbl_dir_operadores.id_Estado = cat_estado.id_Estado
    LEFT JOIN  cat_municipio ON tbl_dir_operadores.id_Municipio = cat_municipio.id_Municipio
    LEFT JOIN  cat_colonia ON tbl_dir_operadores.id_Colonia = cat_colonia.id_Colonia
    LEFT JOIN  cat_localidad ON tbl_dir_operadores.id_Localidad = cat_localidad.id_Localidad
    WHERE tbl_operadores.id_Operador = :id `;

    const [OperadorInformation] = await sequelize.query(query, {
      replacements: { id: `${id_Operador}` },
      type: QueryTypes.SELECT,
    });

    //    console.log(`query inside the function operadorinfo ${JSON.stringify(OperadorInformation)} end of query \n\n end`)
    // Process the query result
    return OperadorInformation;
  } catch (error) {
    throw new Error(
      `Fixed ERROR: Failed to query the catalog tbl_operadores: ${error.message}\nsurely you're inserting an id that doesn't match `
    );
  }
}

// function to update table tbl_cfdi on st_nombreCrudoXML column with the name of the raw XML to stamp
async function updateTableCFDI(xmlFileName, id_CFDI_database) {
  try {
    let query = `UPDATE tbl_cfdi  SET  st_nombreCrudoXML= :xmlFileName WHERE id_CFDI= :id ;`;
    const OperadorInformation = await sequelize.query(query, {
      replacements: {
        //st_nombreCrudoXML: `${xmlFileName}`,
        xmlFileName,
        id: `${id_CFDI_database}`,
      },
      type: QueryTypes.UPDATE,
    });
  } catch (error) {
    console.log("Unable to update the tbl_cfdi table", error);
  }
}

async function readCat_claveproductoservicio_CP(id_ClaveProducto) {
  try {
    let query = `SELECT st_ClaveProducto, st_DescripcionProducto  FROM cat_claveproductoservicio WHERE id_ClaveProducto= :id ;`;
    const ProductoServicioInformation = await sequelize.query(query, {
      replacements: {
        id: `${id_ClaveProducto}`,
      },
      type: QueryTypes.SELECT,
    });
    //console.log("ProductoServicioInformation query", ProductoServicioInformation)
    return ProductoServicioInformation;
  } catch (error) {
    console.log(
      "Unable to query the the CARTA PORTE cat_claveproductoservicio",
      error
    );
  }
}

async function getClaveTipoMoneda(id_Moneda) {
  try {
    const dataTipoMoneda = await tiposMonedasModel.findByPk(id_Moneda);

    let c_Moneda = dataTipoMoneda.dataValues.c_Moneda;
    return c_Moneda;
  } catch (error) {
    console.log("Unable to query the the tipo moneda table", error);
  }
}

async function getClaveTipoComprobante(id_TipoComprobante) {
  try {
    const dataTipoComprobante = await tiposComprobantesModel.findByPk(
      id_TipoComprobante
    );

    let c_TipoDeComprobante =
      dataTipoComprobante.dataValues.c_TipoDeComprobante;
    // console.log("dataTipoMoneda", c_Moneda)
    return c_TipoDeComprobante;
  } catch (error) {
    console.log("Unable to query the the tipo comprobante table", error);
  }
}

async function getClaveUsoCFDI(id_TipoComprobante) {
  try {
    const dataTipoComprobante = await usosCFDIModel.findByPk(
      id_TipoComprobante
    );

    let c_TipoDeComprobante = dataTipoComprobante.dataValues.c_UsoCFDI;
    // console.log("dataTipoMoneda", c_Moneda)
    return c_TipoDeComprobante;
  } catch (error) {
    console.log("Unable to query the the tipo comprobante table", error);
  }
}

async function getClaveFormaPago(id_TipoComprobante) {
  try {
    const dataTipoComprobante = await formaPagosModel.findByPk(
      id_TipoComprobante
    );

    let c_TipoDeComprobante = dataTipoComprobante.dataValues.c_FormaPago;
    // console.log("dataTipoMoneda", c_Moneda)
    return c_TipoDeComprobante;
  } catch (error) {
    console.log("Unable to query the the tipo comprobante table", error);
  }
}

async function getClaveMetodoPago(id_MetodoPago) {
  try {
    const dataTipoComprobante = await metodoPagosModel.findByPk(id_MetodoPago);

    let c_TipoDeComprobante = dataTipoComprobante.dataValues.c_MetodoPago;
    // console.log("dataTipoMoneda", c_Moneda)
    return c_TipoDeComprobante;
  } catch (error) {
    console.log("Unable to query the the tipo comprobante table", error);
  }
}

async function getClaveUnidadCFDI(id_ClaveUnidadPeso) {
  try {
    console.log("\n", id_ClaveUnidadPeso);
    const dataTipoComprobante = await unidadCFDIModel.findByPk(
      id_ClaveUnidadPeso
    );
    // console.log("\n\ndataTipoComprobante", dataTipoComprobante)

    let dataUnidadCFDI = dataTipoComprobante.dataValues;

    return dataUnidadCFDI;
  } catch (error) {
    console.log("Unable to query the dataUnidadCFDI table", error);
  }
}

async function getClaveObjetoImp(id_ObjetoImp) {
  try {
    const dataTipoComprobante = await objImpModel.findByPk(id_ObjetoImp);

    let dataUnidadCFDI = dataTipoComprobante.dataValues.c_ObjetoImp;
    //  console.log("\n\ndataTipoMoneda", dataUnidadCFDI)
    return dataUnidadCFDI;
  } catch (error) {
    console.log("Unable to query the table objetoImp table", error);
  }
}

/******GETTING VARIABLES VALUES BY ID, SENT BY JSON POST ******/

async function createXmlCtrl(req, res) {
  try {
    //const body =req.body;
    const body = req.body; //la data del request venga curada
    const id_CFDI_database = req.id_CFDI_database;

    console.log(
      `Fixed ERROR: Failed to query the catalog tbl_operadores: ${id_CFDI_database}\n`
    );
    // console.log(
    //   "THIS IS THE BODY AT createXmlCtrl",
    //   body,
    //   "ending body request at createXmlCtrl"
    // );

    const st_RFC_emisor = body.st_RFC_emisor;
    const st_RFC_receptor = body.st_RFC_receptor;
    const id_TipoComprobante = body.id_TipoComprobante;
    const id_TipoMoneda = body.id_Moneda;
    const st_LugarExpedicion = body.st_LugarExpedicion;
    const id_RegimenFiscal_emisor = body.id_RegimenFiscal_emisor;
    const id_RegimenFiscalReceptor = body.id_RegimenFiscalReceptor;
    const id_MetodoPago = body.id_MetodoPago;
    const id_UsoCFDI = body.id_UsoCFDI;
    const id_DomicilioFiscalReceptor = body.id_DomicilioFiscalReceptor;
    const st_nombre_emisor = body.st_nombre_emisor; //emisor=remitente
    const st_nombre_receptor = body.st_nombre_receptor;
    const id_ObjetoImp = body.id_ObjetoImp;
    const i_Importe = body.i_Importe;
    const dec_TotalDistRec = body.dec_TotalDistRec;
    const st_RemitenteRFC = body.st_RemitenteRFC;
    const c_ClaveProdServ = await getClaveProdServCFDI(
      body.id_ClaveProdServCFDI
    );
    const st_ClaveUnidadPeso = await getClaveUnidad(body.id_ClaveUnidadPeso);

    const Autotransporte = req.body.Mercancias[0].Autotransporte;

    // console.log(`Autotransporte ${JSON.stringify(Autotransporte)} end of query \n\n end`)

    let UnidadInformation = await getAutotransporteInfo(
      Autotransporte.id_Unidad
    );

    //console.log(`query inside the function unidadinformation ${JSON.stringify(UnidadInformation)} end of query \n\n end`)

    /******QUERYING DATA RECEIVED FROM JSON, TO POST REAL VALUES ON XML******/
    let c_TipoDeComprobante = await tiposComprobantesModel.findOne({
      where: {
        id_TipoComprobante,
      },
      attributes: ["c_TipoDeComprobante"],
    });

    if (c_TipoDeComprobante == "T") {
      console.log("c_TipoDeComprobante is traslado", c_TipoDeComprobante);
    } else {
      console.log("c_TipoDeComprobante is ingreso, do something");
    }

    let st_TipoMoneda = await tiposMonedasModel.findOne({
      where: {
        id_Moneda: id_TipoMoneda,
      },
      attributes: ["c_Moneda"],
    });
    let c_RegimenFiscal_emisor = await regimenFiscalModel.findOne({
      where: {
        id_RegimenFiscal: id_RegimenFiscal_emisor,
      },
      //attributes: ['c_RegimenFiscal']
    });
    let c_RegimenFiscalReceptor = await regimenFiscalModel.findOne({
      where: {
        id_RegimenFiscal: id_RegimenFiscalReceptor,
      },
    });
    let c_MetodoPago = await metodoPagosModel.findOne({
      where: {
        id_MetodoPago: id_MetodoPago,
      },
    });
    /*let c_FormaPago= await formaPagosModel.findOne({
            where: {id_FormaPago},
        });*/
    let c_UsoCFDI = await usosCFDIModel.findOne({
      where: {
        id_UsoCFDI,
      },
    });

    /**USING A RAW QUERY FOR US TO NOT CREATE A MODEL AND QUERYING DIRECT FROM THE DATA BASE,
     * WE NEED TO SANITIZE THE INPUT THOUGH!
     **/
    let st_ObjetoImp = await sequelize.query(
      "SELECT c_ObjetoImp FROM c_ObjetoImp WHERE id_ObjetoImp = ?",
      {
        replacements: [id_ObjetoImp],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const c_ObjetoImp = st_ObjetoImp[0].c_ObjetoImp;
    //console.log("c_ObjetoImp:", c_ObjetoImp);
    st_ObjetoImp = c_ObjetoImp;
    /*****
        The result of the query is an array of objects,
        and we can access the data values of each column using the dataValues property
    *****/

    c_TipoDeComprobante = c_TipoDeComprobante.dataValues.c_TipoDeComprobante;
    st_TipoMoneda = st_TipoMoneda.dataValues.c_Moneda;
    c_RegimenFiscal_emisor = c_RegimenFiscal_emisor.dataValues.c_RegimenFiscal;
    c_RegimenFiscalReceptor =
      c_RegimenFiscalReceptor.dataValues.c_RegimenFiscal;
    c_MetodoPago = c_MetodoPago.dataValues.c_MetodoPago;
    c_UsoCFDI = c_UsoCFDI.dataValues.c_UsoCFDI;

    /**create date on the format ISO 8601: 2023-02-13T03:12:51.137Z*/
    const date = new Date();
    const st_Fecha = date.toISOString();

    //console.log("test", c_FormaPago);

    var JsonStructureCFDI = {
      "cfdi:Comprobante": {
        $: {
          "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xmlns:cartaporte20": "http://www.sat.gob.mx/CartaPorte20",
          "xsi:schemaLocation":
            "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd http://www.sat.gob.mx/CartaPorte20 http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte20.xsd",
          Certificado: "XXXXXX", //NOS LO OTORGA EL SAT DESPUES DE TIMBRAR CFDI
          Fecha: st_Fecha,
          Folio: "CP-1", //uno hasta 40                caracteres alfanuméricos, creo que lo podemos armar nosotros mismos
          LugarExpedicion: st_LugarExpedicion, //Codigo postal
          NoCertificado: "XXXXXX", //NOS LO OTORGA EL SAT DESPUES DE TIMBRAR CFDI
          Sello: "XXXXXX", //NOS LO OTORGA EL SAT DESPUES DE TIMBRAR CFDI
          TipoDeComprobante: c_TipoDeComprobante,
          Version: "4.0",
          Exportacion: "01", //para CFDI de nomina o pago, siempre debe elegirse la clave 01 (significa NO APLICA)
          Moneda: st_TipoMoneda,
          SubTotal: "0",
          Total: "0",

          Serie: "Serie", //Este campo acepta de uno hasta 25 caracteres alfanuméricos.
          //"MetodoPago": c_MetodoPago,
          //"FormaPago": "c_FormaPago",
        },
        "cfdi:Emisor": {
          $: {
            Rfc: st_RFC_emisor,
            Nombre: st_nombre_emisor, //remitente
            RegimenFiscal: c_RegimenFiscal_emisor,
          },
        },
        "cfdi:Receptor": {
          $: {
            Rfc: st_RFC_receptor,
            Nombre: st_nombre_receptor,
            DomicilioFiscalReceptor: id_DomicilioFiscalReceptor, //Codigo postal del domic fiscal
            RegimenFiscalReceptor: c_RegimenFiscalReceptor,
            UsoCFDI: c_UsoCFDI,
          },
        },
        "cfdi:Conceptos": [
          {
            "cfdi:Concepto": [
              {
                $: {
                  ClaveProdServ: `${c_ClaveProdServ}`,
                  NoIdentificacion: "UT421511",
                  Cantidad: "1",
                  ClaveUnidad: `${st_ClaveUnidadPeso}`,
                  Unidad: "Pieza",
                  Descripcion: "Transporte de carga por carretera",
                  ValorUnitario: "0.00",
                  ObjetoImp: st_ObjetoImp,
                  Importe: i_Importe,
                  /**En este campo se deberá registrar el importe del impuesto
                    trasladado que aplica al concepto, el cual será el resultado de
                    multiplicar el valor de la base por la tasa.

                    Ejemplo:
                    Base: 10,000.00
                    Tasa: 0.16
                    Importe: 1,600.00
              **/
                },
              },
            ],
          },
        ],
        "cfdi:Complemento": {
          "cartaporte20:CartaPorte": {
            $: {
              Version: "2.0",
              TranspInternac: "No",
              TotalDistRec: dec_TotalDistRec, //DECIMAL(7,2)
            },
            "cartaporte20:Ubicaciones": {
              "cartaporte20:Ubicacion": [],
            },
            "cartaporte20:Mercancias": {
              $: {
                PesoBrutoTotal: "1.0",
                UnidadPeso: "XBX",
                NumTotalMercancias: "1",
              },
              "cartaporte20:Mercancia": [],
              "cartaporte20:Autotransporte": {
                $: {
                  PermSCT: `${UnidadInformation[0].st_Clave}`,
                  NumPermisoSCT: `${UnidadInformation[0].st_PermisoSCT}`,
                },

                "cartaporte20:IdentificacionVehicular": {
                  $: {
                    ConfigVehicular: `${UnidadInformation[0].st_Clave}`,
                    PlacaVM: `${UnidadInformation[0].st_Placa}`,
                    AnioModeloVM: `${UnidadInformation[0].st_Anio}`,
                  },
                },

                "cartaporte20:Seguros": {
                  $: {
                    AseguraCarga: "Seguros",
                    AseguraRespCivil: "Seguros",
                    PolizaRespCivil: "123456789",
                  },
                },
              },
            },
            "cartaporte20:FiguraTransporte": {
              "cartaporte20:TiposFigura": [],
            },
          },
        },
      },
    };
    const options = {
      rootName: "cfdi:Comprobante",
      headless: true,
      attrNodeName: "cartaporte20:Ubicacion",
      cdata: true,
    };

    var builder = new xml2js.Builder();

    var ubicacionesArray =
      JsonStructureCFDI["cfdi:Comprobante"]["cfdi:Complemento"][
        "cartaporte20:CartaPorte"
      ]["cartaporte20:Ubicaciones"]["cartaporte20:Ubicacion"];

    const ubicaciones = req.body.Ubicaciones;
    const ubicacionesLength = ubicaciones.length;

    console.log(`Length of Ubicaciones array: ${ubicacionesLength}`);

    let origenCounter = 1;
    let destinoCounter = 1;

    for (let i = 0; i < ubicacionesLength; i++) {
      const ubicacion = ubicaciones[i];
      if (ubicacion.TipoUbicacion === "Origen") {
        // Perform the action for "TipoUbicacion" equal to "Origen"
        console.log(`Processing TipoUbicacion ${i} equal to 'Origen':`);
        ubicacionesArray.push({
          $: {
            // Ubicacion properties here
            TipoUbicacion: "Origen",
            RFCRemitenteDestinatario: `${ubicaciones[i].st_RemitenteRFC}`,
            FechaHoraSalidaLlegada: `${ubicaciones[i].date_FechaSalida}`,
            IDUbicacion: `OR${String(origenCounter).padStart(6, "0")}`,
            NombreRemitenteDestinatario: `${ubicaciones[i].st_RemitenteNombre}`,
          },
          "cartaporte20:Domicilio": {
            $: {
              // Domicilio properties here
              Calle: `${ubicaciones[i].Domicilio.st_Calle}`,
              Colonia: `${await getColonia(
                ubicaciones[i].Domicilio.id_Colonia
              )}`,
              Localidad: `${await getLocalidad(
                ubicaciones[i].Domicilio.id_Localidad
              )}`,
              Municipio: `${await getMunicipio(
                ubicaciones[i].Domicilio.id_Municipio
              )}`,
              Estado: `${await getEstado(ubicaciones[i].Domicilio.id_Estado)}`,
              Pais: "MEX",
              CodigoPostal: `${await getCodigoPostal(
                ubicaciones[i].Domicilio.c_codigoPostal
              )}`,
            },
          },
        });
        origenCounter++;
      } else {
        console.log(`Processing 'TipoUbicacion' ${i} equal to 'Destino'`);
        ubicacionesArray.push({
          $: {
            // Ubicacion properties here
            TipoUbicacion: "Destino",
            RFCRemitenteDestinatario: `${ubicaciones[i].st_DestinatarioRFC}`,
            FechaHoraSalidaLlegada: `${ubicaciones[i].st_FechaHoraLlegada}`,
            IDUbicacion: `DE${String(destinoCounter).padStart(6, "0")}`,
            DistanciaRecorrida: `${ubicaciones[i].DistanciaRecorrida}`,
          },
          "cartaporte20:Domicilio": {
            $: {
              // Domicilio properties here
              Calle: `${ubicaciones[i].Domicilio.st_Calle}`,
              Colonia: `${await getColonia(
                ubicaciones[i].Domicilio.id_Colonia
              )}`,
              Localidad: `${await getLocalidad(
                ubicaciones[i].Domicilio.id_Localidad
              )}`,
              Municipio: `${await getMunicipio(
                ubicaciones[i].Domicilio.id_Municipio
              )}`,
              Estado: `${await getEstado(ubicaciones[i].Domicilio.id_Estado)}`,
              Pais: "MEX",
              CodigoPostal: `${await getCodigoPostal(
                ubicaciones[i].Domicilio.c_codigoPostal
              )}`,
            },
          },
        });
        destinoCounter++;
      }
    }

    var mercanciasArray =
      JsonStructureCFDI["cfdi:Comprobante"]["cfdi:Complemento"][
        "cartaporte20:CartaPorte"
      ]["cartaporte20:Mercancias"]["cartaporte20:Mercancia"];

    // const autotransportes = req.body.Mercancias.Autotransportes;
    // const mercanciasLength = mercancias.length;
    // console.log(`Length of Mercancias array: ${mercanciasLength}`);

    const mercancias = req.body.Mercancias;
    const mercanciasLength = mercancias.length;
    //console.log(`\n\nLength of Mercancias array: ${mercanciasLength}`);
    //console.log(mercancias)
    let aux_counter_direccion = 0;
    for (let i = 0; i < mercanciasLength; i++) {
      let ID_DirOrigen =
        ubicacionesArray[aux_counter_direccion]["$"]["IDUbicacion"];
      let ID_DirDestino =
        ubicacionesArray[aux_counter_direccion + 1]["$"]["IDUbicacion"];
      const mercancia_json_info = mercancias[i];
      // console.log(mercancias[i])
      //console.log(`Length of Mercancias[i] array: ${mercancias[i].length}`);

      const mercancia = await readCat_claveproductoservicio_CP(
        mercancias[i].id_ClaveProducto
      );
      // Perform the action for teach mercancia" equal to "Origen"
      let mercancia_queried = mercancia.pop();
      // console.log(` mercancia lenght ${i}: ${mercancia.length}`);
      // console.log(mercancia.pop())
      let ClaveProducto = mercancia_queried.st_ClaveProducto;
      let DescripcionProducto = mercancia_queried.st_DescripcionProducto;

      mercanciasArray.push({
        $: {
          // Mercancia properties here
          BienesTransp: `${ClaveProducto}`,
          Descripcion: `${DescripcionProducto}`,
          Cantidad: `${mercancia_json_info.Cantidad}`,
          ClaveUnidad: `${mercancias[i].ClaveUnidad}`,
          PesoEnKg: `${mercancias[i].PesoEnKg}`,
          MaterialPeligroso: `${mercancias[i].MaterialPeligroso}`,
        },
      });

      // mercanciasArray.push({
      //   $: {
      //     // Mercancia properties here
      //     BienesTransp: `${ClaveProducto}`,
      //     Descripcion: `${DescripcionProducto}`,
      //     //Cantidad: `${ mercancia_json_info.Cantidad}`,
      //     //ClaveUnidad: `${mercancias[i].ClaveUnidad}`,
      //     //PesoEnKg: `${mercancias[i].PesoEnKg}`,
      //     //MaterialPeligroso: `${mercancias[i].MaterialPeligroso}`,
      //   },

      //   "cartaporte20:CantidadTransporta": {
      //     $: {
      //       // Domicilio properties here
      //       Cantidad: `${mercancia_json_info.CantidadTransporta.Cantidad}`,
      //       IDOrigen: `${ID_DirOrigen}`,
      //       IDDestino: `${ID_DirDestino}`,
      //     },

      //   }
      // })

      aux_counter_direccion = aux_counter_direccion + 2;
      //console.log("\n\n", aux_counter_direccion)
    }

    const remolques = req.body.Mercancias[0].Autotransporte.Remolques;
    // console.log(`This is inside the remolques object: ${JSON.stringify(remolques)}`)

    const remolquesLength = remolques.length;
    // console.log(`Length of remolques array: ${remolquesLength}`);

    if (remolquesLength < 3) {
      JsonStructureCFDI["cfdi:Comprobante"]["cfdi:Complemento"][
        "cartaporte20:CartaPorte"
      ]["cartaporte20:Mercancias"]["cartaporte20:Autotransporte"][
        "cartaporte20:Remolques"
      ] = {
        "cartaporte20:Remolque": [], // puede tener 0-2 remolques
      };
      console.log("entering conditional remolquesLength");

      var remolquesArray =
        JsonStructureCFDI["cfdi:Comprobante"]["cfdi:Complemento"][
          "cartaporte20:CartaPorte"
        ]["cartaporte20:Mercancias"]["cartaporte20:Autotransporte"][
          "cartaporte20:Remolques"
        ]["cartaporte20:Remolque"];

      for (let i = 0; i < remolquesLength; i++) {
        //console.log(remolques[i].id_Remolque)
        const remolqueInformation = await getRemolqueInfo(
          remolques[i].id_Remolque
        );
        //const remolque = remolques[i];
        //        console.log(`Pushing remolque id ${i}: ${remolqueInformation}`);
        //console.log(`remolqueInformation.length: ${remolqueInformation.length}`);

        let tipo_remolque = remolqueInformation[0].st_ClaveRemolque;
        // console.log("tipo_remolque", tipo_remolque)
        let placa_remolque = remolqueInformation[0].st_Placa;
        // console.log("placa_remolque", placa_remolque)

        remolquesArray.push({
          // Mercancia properties here
          $: {
            Placa: `${placa_remolque}`,
            SubTipoRem: `${tipo_remolque}`,
          },
        });
      }
    } else if (remolquesLength == 0) {
      console.log("There are no remolques to add.");
    } else {
      throw new Error(
        `Fixed ERROR: You can only a maximum of 2 remolques, you're tring to add ${
          remolquesLength + 1
        } remolques. `
      );
    }

    var TiposFiguraArray =
      JsonStructureCFDI["cfdi:Comprobante"]["cfdi:Complemento"][
        "cartaporte20:CartaPorte"
      ]["cartaporte20:FiguraTransporte"]["cartaporte20:TiposFigura"];
    const TiposFigura = req.body.FiguraTransporte;

    //console.log(`this is the domicilio of figura transport ${JSON.stringify(req.body.FiguraTransporte[0].Domicilio)}`);

    let validateLength_DomicilioFigura = await validate_DomicilioFigura(
      TiposFigura[0].id_Operador
    );
    let OperadorInformation = await getOperadorInformation(
      TiposFigura[0].id_Operador
    );

    //console.log(`this is operador info ${JSON.stringify(OperadorInformation)}`);

    if (validateLength_DomicilioFigura > 0) {
      console.log("it exists a domicilio of Operador");

      //const tipoAutotransporte = req.body.FiguraTransporte[0].Domicilio;
      //let id_tipoFiguraOperador = await getIdTipoFigura(TiposFigura[0].id_TipoFigura);

      const NombreFigura = OperadorInformation.st_Nombre;
      const RFCFigura = OperadorInformation.st_RFC;

      TiposFiguraArray.push({
        $: {
          TipoFigura: `${OperadorInformation.st_ClaveFiguraTransporte}`,
          RFCFigura: `${RFCFigura}`,
          NumLicencia: `${OperadorInformation.st_NumLicencia}`,
          NombreFigura: `${NombreFigura} ${OperadorInformation.st_ApellidoP} ${OperadorInformation.st_ApellidoM}`,
        },
        "cartaporte20:Domicilio": {
          $: {
            Calle: `${OperadorInformation.st_Calle}`,
            Municipio: `${OperadorInformation.c_Municipio}`,
            Estado: `${OperadorInformation.c_Estado}`,
            Pais: `${OperadorInformation.c_Pais}`,
            Colonia: `${OperadorInformation.c_colonia}`,
            Localidad: `${OperadorInformation.c_Localidad}`,
            CodigoPostal: `${OperadorInformation.c_codigoPostal}`,
          },
        },
      });
    } else {
      console.log(`Pushing TiposFigura number`);

      TiposFiguraArray.push({
        $: {
          TipoFigura: `${OperadorInformation.st_ClaveFiguraTransporte}`,
          RFCFigura: `${OperadorInformation.st_RFC}`,
          NumLicencia: `${OperadorInformation.st_NumLicencia}`,
          NombreFigura: `${NombreFigura} ${OperadorInformation.st_ApellidoP} ${OperadorInformation.st_ApellidoM}`,
        },
      });
    }

    var xmlRaw = builder.buildObject(JsonStructureCFDI, options);
    //console.log(`this is generated raw XML${xmlRaw}`);

    let xmlFileName = await createTimestampedXmlFile(xmlRaw);
    updateTableCFDI(xmlFileName.slice(0, -4), id_CFDI_database);

    //const cfdi = await cfdiModel.find(body);

    handleHttpResponse(res, {
      xmlRaw: `${xmlRaw}`,
      xmlFileName: `${xmlFileName}`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });

    console.log("Login error: " + e);
    //handleHttpError(res, "ERROR_CREATE_XML");
  }
}

async function createXmlCtrlFromDB(req, res) {
  try {
    console.log("createXmlCtrlFromDB");
    const id_CFDI_DB = parseInt(req.params.id);
    const dataCFDI = await readCFDICtrl(req, res, id_CFDI_DB);
    let id_TipoComprobante = dataCFDI.shift().id_TipoComprobante;
    let rawXML;
    switch (id_TipoComprobante) {
      case 1:
        console.log("Creating ingreso CFDI ");
        rawXML = await populateXMLIngresoCFDI(id_CFDI_DB);
        let xmlFileName = await createTimestampedXmlFile(rawXML);
        updateTableCFDI(xmlFileName.slice(0, -4), id_TipoComprobante);
        handleHttpResponse(res, {
          xmlRaw: `${rawXML}`,
          xmlFileName: `${xmlFileName}`,
        });
        break;
      case 2:
        console.log("Creating Traslado CFDI ");
        break;
      default:
        console.log(
          "Specify the type of CFDI either Ingreso, Egreso, traslado, etc."
        );
        return;
    }

    //Now 'rawXMLArray' contains all the 'rawXML' values

    //handleHttpResponse(res, rawXML);
  } catch (e) {
    handleHttpError(res, "ERROR_CREATING_CFDI_FROM_DB", e);
  }
}

async function populateXMLIngresoCFDI(id_CFDI_DB) {
  try {
    console.log("id_CFDI_DB", id_CFDI_DB);

    const generalCfdiInfo = await cfdiModel.findByPk(id_CFDI_DB);
    //    console.log(generalCfdiInfo)
    //APARTADO DE CFDI GENERAL
    let c_moneda = await getClaveTipoMoneda(generalCfdiInfo.id_Moneda);
    let c_UsoCFDI = await getClaveUsoCFDI(generalCfdiInfo.id_UsoCFDI);
    let c_FormaPago = await getClaveFormaPago(generalCfdiInfo.id_FormaPago);
    let c_MetodoPago = await getClaveMetodoPago(generalCfdiInfo.id_MetodoPago);
    let c_TipoDeComprobante = await getClaveTipoComprobante(
      generalCfdiInfo.id_TipoComprobante
    );
    const date_FechaCFDI = await getFormattedDate();
    const empresaInfo = await getEmpresaInfo(id_CFDI_DB)
    const clienteInfo = await getClienteInfo(id_CFDI_DB)


    //APARTADO DE PRODUCTOS-SERVICIOS CFDI

    let query = "SELECT * from tbl_prodserv_cfdi WHERE id_CFDI=:id";
    const prodServCFDI = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements : {id: id_CFDI_DB}
    });

    console.log("lenght of prod-serv", prodServCFDI.length);

    const xml = xmlbuilder.create("cfdi:Comprobante", {
      version: "1.0",
      encoding: "UTF-8",
      headless: false, // Set headless to false to include the XML declaration
    });

    // Include the XML declaration manually
    xml.dec({ version: "1.0", encoding: "UTF-8" });

    xml.att("xmlns:cfdi", "http://www.sat.gob.mx/cfd/4");
    xml.att("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xml.att("xmlns:cartaporte20", "http://www.sat.gob.mx/CartaPorte20");
    xml.att(
      "xsi:schemaLocation",
      "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd http://www.sat.gob.mx/CartaPorte20 http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte20.xsd"
    );

    // Add dynamic generalCfdiInfo to the XML structure
    xml.att("Fecha", date_FechaCFDI);
    //xml.att('Folio', generalCfdiInfo.Folio);
    xml.att("LugarExpedicion", generalCfdiInfo.st_LugarExpedicion);
    xml.att("TipoDeComprobante", c_TipoDeComprobante);
    console.log("getEmpresaInfo")

    console.log(empresaInfo);
    xml.att("NoCertificado", empresaInfo.st_NoCertificado);
    xml.att("Sello", "");
    xml.att("Certificado", "");
    xml.att("Version", "4.0");
//    xml.att("Exportacion", "");
    xml.att("Moneda", c_moneda);
    xml.att("FormaPago", c_FormaPago);
    xml.att("MetodoPago", c_MetodoPago);

    xml.att("SubTotal", generalCfdiInfo.dec_SubTotal);
    xml.att("Total", generalCfdiInfo.dec_Total);
    xml.att("Serie", "Serie");

    // Add more dynamic generalCfdiInfo attributes here

    // Add Emisor element
    const emisor = xml.ele("cfdi:Emisor");
    emisor.att("Rfc", empresaInfo.st_RFC);
    emisor.att("Nombre", empresaInfo.st_RazonSocial);
    emisor.att("RegimenFiscal", empresaInfo.c_RegimenFiscal);

    // Add Receptor element
    console.log("clienteInfo", clienteInfo)
    const receptor = xml.ele("cfdi:Receptor");
    receptor.att("Rfc", clienteInfo.st_RFC);
    receptor.att("Nombre", clienteInfo.st_RazonSocial);
    receptor.att("RegimenFiscalReceptor", clienteInfo.c_RegimenFiscal);
    receptor.att(
      "DomicilioFiscalReceptor",
      clienteInfo.c_DomicilioFiscal
    );
    receptor.att("UsoCFDI", c_UsoCFDI);
    
    // receptor.att("Rfc", generalCfdiInfo.st_RFC_receptor);
    // receptor.att("Nombre", generalCfdiInfo.st_nombre_receptor);
    // receptor.att("RegimenFiscalReceptor", generalCfdiInfo.id_RegimenFiscalReceptor);
    // receptor.att(
    //   "DomicilioFiscalReceptor",
    //   generalCfdiInfo.id_DomicilioFiscalReceptor
    // );
    // receptor.att("UsoCFDI", c_UsoCFDI);

    // Add Conceptos element
    const conceptos = xml.ele("cfdi:Conceptos");
    //apartado para tabla tbl_prodserv_cfdi

    // Iterate through the results of prodServCFDI query
    let impuestos;

    for (const prodServResult of prodServCFDI) {
      //apartado para tabla tbl_prodserv_cfdi
      let c_prodServCFDI = await getClaveProdServCFDI(
        prodServResult.id_ClaveProdServCFDI
      );
      let dataUnidadCFDI = await getClaveUnidadCFDI(
        prodServResult.id_ClaveUnidadPesoCFDI
      );
      let c_ObjetoImp = await getClaveObjetoImp(prodServResult.id_ObjetoImp);
      let i_Cantidad = prodServResult.i_Cantidad;

      const concepto = conceptos.ele("cfdi:Concepto");
      concepto.att("ClaveProdServ", c_prodServCFDI);
      concepto.att("Cantidad", i_Cantidad);
      concepto.att("ClaveUnidad", dataUnidadCFDI.c_ClaveUnidad);
      concepto.att("Unidad", dataUnidadCFDI.st_Nombre);
      concepto.att("ObjetoImp", c_ObjetoImp);
      concepto.att("Descripcion", prodServResult.st_DescripcionConcepto);
      concepto.att("Importe", prodServResult.dec_ImporteConcepto);
      concepto.att("ValorUnitario", prodServResult.dec_ValorUnitarioConcepto);

      console.log(prodServResult);

      let hasImpuestos = false;

      if (prodServResult.id_TipoFactorTraslado != null) {
        console.log("There is an traslado impuesto");

        let ImpuestoTrasladoInformation = await getClaveImpuesto(
          prodServResult.id_ImpuestoTraslado
        );
        let c_ImpuestoTraslado = ImpuestoTrasladoInformation.shift().c_Impuesto;
        let c_TipoFactor = await getClaveTipoFactor(
          prodServResult.id_TipoFactorRetencion);
        // Create the Impuestos element for the first Traslado
        if (!hasImpuestos) {
          impuestos = concepto.ele("cfdi:Impuestos");
          hasImpuestos = true;
        }
        const traslados = impuestos.ele("cfdi:Traslados");
        const traslado = traslados.ele("cfd:Traslado");

        traslado.att("Base", prodServResult.dec_BaseTraslado);
        traslado.att("Impuesto", c_ImpuestoTraslado);
        traslado.att("TipoFactor", c_TipoFactor);
        traslado.att("TasaOCuota", prodServResult.dec_TasaOCuotaTraslado);
       
      
      }



      if (prodServResult.dec_BaseRetencion != null) {
        console.log("There is an retencion impuesto");
        let dec_BaseRetencion = prodServResult.dec_BaseRetencion;

        let c_TipoFactor = await getClaveTipoFactor(
          prodServResult.id_TipoFactorTraslado
        );
        let ImpuestoretencionInformation = await getClaveImpuesto(
          prodServResult.id_ImpuestoRetencion
        );
        let c_Impuesto = ImpuestoretencionInformation.shift().c_Impuesto;

        let dec_TasaOCuotaretencion = prodServResult.dec_TasaOCuotaRetencion;
        if (!hasImpuestos) {
          impuestos = concepto.ele("cfdi:Impuestos");
          hasImpuestos = true;

        }
        const retenciones = impuestos.ele("cfdi:Retenciones");
        const retencion = retenciones.ele("cfd:Retencion");
        retencion.att("Base", dec_BaseRetencion);
        retencion.att("Impuesto", c_Impuesto);
        retencion.att("TipoFactor", c_TipoFactor);
        retencion.att("TasaOCuota", dec_TasaOCuotaretencion);

       
      }
    }

    // concepto.att('NoIdentificacion', generalCfdiInfo.NoIdentificacion);

    // Convert XML to string
    const xmlString = xml.end({ pretty: true });

    // res.set('Content-Type', 'text/xml');
    return xmlString;
  } catch (error) {
    console.log(error);
  }
}

async function getFormattedDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");

  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T${
    hours - 1}:${minutes}:${seconds}`;
  return formattedDate;
}

async function getClaveImpuesto(id_Impuesto) {
  try {
    let query = `SELECT * from cat_impuesto WHERE id_Impuesto=:id`;

    let UnidadInformation = await sequelize.query(query, {
      replacements: { id: `${id_Impuesto}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    //console.log("UnidadInformation test ", UnidadInformation)
    return UnidadInformation;
  } catch (error) {
    console.error("Error querying SQL table cat_impuesto:", error);
  }
}

async function getClaveTipoFactor(id_TipoFactor) {
  try {
    let query = `SELECT * from cat_tipofactor WHERE id_TipoFactor=:id`;

    let UnidadInformation = await sequelize.query(query, {
      replacements: { id: `${id_TipoFactor}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    //console.log("UnidadInformation test ", UnidadInformation)
    return UnidadInformation.shift().c_TipoFactor;
  } catch (error) {
    console.error("Error querying SQLa table cat_impuesto:", error);
  }
}


async function getEmpresaInfo(id_CFDI) {
  try {
    let query = `SELECT tbl_empresas.*, c_regimenfiscal.c_RegimenFiscal from tbl_empresas LEFT JOIN tbl_cfdi ON tbl_empresas.id_empresa = tbl_cfdi.id_empresa LEFT JOIN c_regimenfiscal ON c_regimenfiscal.id_RegimenFiscal = tbl_empresas.id_RegimenFiscal WHERE tbl_cfdi.id_CFDI=:id`;

    let EmpresaInformation = await sequelize.query(query, {
      replacements: { id: `${id_CFDI}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    // console.log("EmpresaInformation.shift ", EmpresaInformation.shift())
    return EmpresaInformation.shift()
  } catch (error) {
    console.error("Error querying SQLa table cat_impuesto:", error);
  }
}


async function getClienteInfo(id_CFDI){
  try {
    let query = `SELECT tbl_clientes.*, c_regimenfiscal.c_RegimenFiscal FROM tbl_cfdi LEFT JOIN tbl_clientes ON tbl_clientes.id_Cliente =  tbl_cfdi.id_Cliente LEFT JOIN c_regimenfiscal ON c_regimenfiscal.id_RegimenFiscal = tbl_clientes.id_RegimenFiscal WHERE id_CFDI=:id`;

    let ClienteInformation = await sequelize.query(query, {
      replacements: { id: `${id_CFDI}` },
      type: QueryTypes.SELECT,
    });
    // Process the query result
    // console.log("ClienteInformation.shift ", ClienteInformation.shift())
    return ClienteInformation.shift()

  } catch (error) {
    console.log("Error querying table tbl_clientes ", error)
  }
}



module.exports = {
  createXmlCtrl,
  createXmlCtrlFromDB,
};
