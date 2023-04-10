/***
 * IMPORTANDO LIBRERIAS PARA HACER QUERIES
 */
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
var xml2js = require("xml2js");

/******Se invocan las tablas/modelos necesarias para los queries*********/
const { tiposComprobantesModel } = require("../models");
const { tiposMonedasModel } = require("../models");
const { regimenFiscalModel } = require("../models");
const { metodoPagosModel } = require("../models");
const { formaPagosModel } = require("../models");
const { usosCFDIModel } = require("../models");

/******Se invocan las librerias necesarias para los crear el archivo .xml*********/
var fs = require("fs");

async function createXmlCtrl(req, res) {
  try {
    /******GETTING VARIABLES VALUES BY ID, SENT BY JSON POST ******/
    const body = matchedData(req);
    const st_RFC_emisor = body.st_RFC_emisor;
    const st_RFC_receptor = body.st_RFC_receptor;
    const id_TipoComprobante = body.id_TipoComprobante;
    const id_TipoMoneda = body.id_TipoMoneda;
    const st_LugarExpedicion = body.st_LugarExpedicion;
    const id_RegimenFiscal_emisor = body.id_RegimenFiscal_emisor;
    const id_RegimenFiscalReceptor = body.id_RegimenFiscalReceptor;
    const id_MetodoPago = body.id_MetodoPago;
    //const id_FormaPago = body.id_FormaPago;
    const id_UsoCFDI = body.id_UsoCFDI;
    const id_DomicilioFiscalReceptor = body.id_DomicilioFiscalReceptor;
    const st_nombre_emisor = body.st_nombre_emisor; //emisor=remitente
    const st_nombre_receptor = body.st_nombre_receptor;
    const id_ObjetoImp = body.id_ObjetoImp;
    const i_Importe = body.i_Importe;


    //const id_DomicilioFiscalReceptor = body.id_DomicilioFiscalReceptor;
    console.log("i_Importe", i_Importe);

    /******QUERYING DATA RECEIVED FROM JSON, TO POST REAL VALUES ON XML******/
    let st_TipoComprobante = await tiposComprobantesModel.findOne({
      where: { id_TipoComprobante },
      attributes: ["st_TipoComprobante"],
    });
    let st_TipoMoneda = await tiposMonedasModel.findOne({
      where: { id_Moneda: id_TipoMoneda },
      attributes: ["c_Moneda"],
    });

    let c_RegimenFiscal_emisor = await regimenFiscalModel.findOne({
      where: { id_RegimenFiscal: id_RegimenFiscal_emisor },
      //attributes: ['c_RegimenFiscal']
    });
    let c_RegimenFiscalReceptor = await regimenFiscalModel.findOne({
      where: { id_RegimenFiscal: id_RegimenFiscalReceptor },
    });
    let c_MetodoPago = await metodoPagosModel.findOne({
      where: { id_MetodoPago: id_MetodoPago },
    });
    /*let c_FormaPago= await formaPagosModel.findOne({
            where: {id_FormaPago},
        });*/
    let c_UsoCFDI = await usosCFDIModel.findOne({
      where: { id_UsoCFDI },
    });

    /**USING A RAW QUERY FOR US TO NOT CREATE A MODEL AND QUERYING DIRECT FROM THE DATA BASE,
     * WE NEED TO SANITIZE THE INPUT THOUGH!
     */
    let st_ObjetoImp = await sequelize.query(
      "SELECT c_ObjetoImp FROM c_ObjetoImp WHERE id_ObjetoImp = ?",
      {
        replacements: [id_ObjetoImp],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const c_ObjetoImp = st_ObjetoImp[0].c_ObjetoImp;
    console.log("c_ObjetoImp:", c_ObjetoImp);
    st_ObjetoImp = c_ObjetoImp;


    /******
        The result of the query is an array of objects, 
        and we can access the data values of each column using the dataValues property
        ******/
    st_TipoComprobante = st_TipoComprobante.dataValues.st_TipoComprobante;
    st_TipoMoneda = st_TipoMoneda.dataValues.c_Moneda;
    c_RegimenFiscal_emisor = c_RegimenFiscal_emisor.dataValues.c_RegimenFiscal;
    c_RegimenFiscalReceptor =
      c_RegimenFiscalReceptor.dataValues.c_RegimenFiscal;
    c_MetodoPago = c_MetodoPago.dataValues.c_MetodoPago;
    //c_FormaPago =  c_FormaPago.dataValues.c_FormaPago;
    c_UsoCFDI = c_UsoCFDI.dataValues.c_UsoCFDI;

    /**create date on the format ISO 8601: 2023-02-13T03:12:51.137Z*/
    const date = new Date();
    const st_Fecha = date.toISOString();

    //console.log("test", c_FormaPago);

    var obj = {
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
          TipoDeComprobante: st_TipoComprobante,
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
                  ClaveProdServ: "78101800",
                  NoIdentificacion: "UT421511",
                  Cantidad: "1",
                  ClaveUnidad: "H87",
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
        "cfdi:Complemento": [
          {
            "cartaporte20:CartaPorte": [
              {
                "cartaporte20:Ubicaciones": {
                  "cartaporte20:Ubicacion": [
                    {
                      $: {
                        IDUbicacion: "OR101010",
                        TipoUbicacion: "Origen",
                        RFCRemitenteDestinatario: "EKU9003173C9",
                        FechaHoraSalidaLlegada: "2021-11-01T00:00:00",
                      },

                      "cartaporte20:Domicilio": {
                        $: {
                          Calle: "calle",
                          NumeroExterior: "211",
                          Colonia: "1957",
                          Localidad: "13",
                          Referencia: "casa blanca",
                          Municipio: "011",
                          Estado: "CMX",
                          Pais: "MEX",
                          CodigoPostal: "13250",
                        },
                      },
                    },
                    {
                      $: {
                        IDUbicacion: "DE202020",
                        TipoUbicacion: "Destino",
                        RFCRemitenteDestinatario: "AAA010101AAA",
                        FechaHoraSalidaLlegada: "2021-11-01T01:00:00",
                        DistanciaRecorrida: "1",
                      },

                      "cartaporte20:Domicilio": {
                        $: {
                          Calle: "calle",
                          NumeroExterior: "214",
                          Colonia: "0347",
                          Localidad: "23",
                          Referencia: "casa blanca",
                          Municipio: "004",
                          Estado: "COA",
                          Pais: "MEX",
                          CodigoPostal: "25350",
                        },
                      },
                    },
                    //{ "attr3": 'value3' }
                  ],
                },
                "cartaporte20:Mercancias": {
                  $: {
                    PesoBrutoTotal: "1.0",
                    UnidadPeso: "XBX",
                    NumTotalMercancias: "1",
                  },
                  "cartaporte20:Mercancia": {
                    $: {
                      BienesTransp: "11121900",
                      Descripcion: "Accesorios de equipo de telefonía",
                      Cantidad: "1.0",
                      ClaveUnidad: "XBX",
                      PesoEnKg: "1.0",
                      MaterialPeligroso: "No",
                    },
                    "cartaporte20:CantidadTransporta": {
                      $: {
                        Cantidad: "1",
                        IDOrigen: "OR101010",
                        IDDestino: "DE202020",
                      },
                    },
                  },
                  "cartaporte20:Autotransporte": {
                    $: { PermSCT: "TPAF01", NumPermisoSCT: "NumPermisoSCT" },

                    "cartaporte20:IdentificacionVehicular": {
                      $: {
                        ConfigVehicular: "VL",
                        PlacaVM: "plac892",
                        AnioModeloVM: "2020",
                      },
                    },

                    "cartaporte20:Seguros": {
                      $: {
                        AseguraCarga: "Seguros",
                        AseguraRespCivil: "Seguros",
                        PolizaRespCivil: "123456789",
                      },
                    },
                    "cartaporte20:Remolques": {
                      "cartaporte20:Remolque": {
                        $: { SubTipoRem: "CTR004", Placa: "VL45K98" },
                      },
                    },
                  },
                },
                "cartaporte20:FiguraTransporte": {
                  "cartaporte20:TiposFigura": {
                    $: {
                      TipoFigura: "01",
                      RFCFigura: "VAAM130719H60",
                      NumLicencia: "a234567890",
                    },
                  },
                },
              },
            ],
            $: { Version: "2.0", TranspInternac: "No", TotalDistRec: "1" },
          },
        ],
      },
    };

    const options = {
      rootName: "cfdi:Comprobante",
      headless: true,
      attrNodeName: "cartaporte20:Ubicacion",
      cdata: true,
    };

    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj, options);

    console.log(xml);
    var timestamp = Date.now();

    fs.writeFile(
      "./storage/documentos/cfdi_" + timestamp + ".xml",
      xml,
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );

    handleHttpResponse(res, xml);
  } catch (e) {
    console.log("Login error: " + e);
    handleHttpError(res, "ERROR_CREATE_XML");
  }
}

module.exports = {
  createXmlCtrl,
};
