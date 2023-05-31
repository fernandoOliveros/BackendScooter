/***
 * IMPORTANDO LIBRERIAS PARA HACER QUERIES
 */
const {
  sequelize
} = require("../config/mysql");
const {
  QueryTypes
} = require("sequelize");

const {
  handleHttpResponse
} = require("../utils/handleResponse");
const {
  handleHttpError
} = require("../utils/handleError");
const {
  matchedData
} = require("express-validator");
var xml2js = require("xml2js");

/******Se invocan las tablas/modelos necesarias para los queries*********/
const {
  tiposComprobantesModel
} = require("../models");
const {
  tiposMonedasModel
} = require("../models");
const {
  regimenFiscalModel
} = require("../models");
const {
  metodoPagosModel
} = require("../models");
const {
  formaPagosModel
} = require("../models");
const {
  usosCFDIModel
} = require("../models");

/******Install the fs  library to  create the file cfdi_YYYY-MM-DD_HH-mm-ss.xml*********/
var fs = require("fs");
const moment = require("moment"); // Install the moment library to format the date and time

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

async function createXmlCtrl(req, res) {
  try {
    /******GETTING VARIABLES VALUES BY ID, SENT BY JSON POST ******/
    //const body =req.body;
    const body = req.body; //la data del request venga curada

    console.log(
      "THIS IS THE BODY AT createXmlCtrl",
      body,
      "ending createXmlCtrl"
    );

    const st_RFC_emisor = body.st_RFC_emisor;
    const st_RFC_receptor = body.st_RFC_receptor;
    const id_TipoComprobante = body.id_TipoComprobante;
    const id_TipoMoneda = body.id_Moneda;
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
    const dec_TotalDistRec = body.dec_TotalDistRec;
    const st_RemitenteRFC = body.st_RemitenteRFC;
    const date_FechaSalida = body.date_FechaSalida;
    const st_DestinatarioRFC = body.st_DestinatarioRFC;
    const st_FechaHoraLlegada = body.st_FechaHoraLlegada;

    //const id_DomicilioFiscalReceptor = body.id_DomicilioFiscalReceptor;
    //1 de diciembre de 2022 3 de julio de 2023
    //console.log("dec_TotalDistRec", dec_TotalDistRec);

    /******QUERYING DATA RECEIVED FROM JSON, TO POST REAL VALUES ON XML******/
    let st_TipoComprobante = await tiposComprobantesModel.findOne({
      where: {
        id_TipoComprobante
      },
      attributes: ["st_TipoComprobante"],
    });
    let st_TipoMoneda = await tiposMonedasModel.findOne({
      where: {
        id_Moneda: id_TipoMoneda
      },
      attributes: ["c_Moneda"],
    });

    let c_RegimenFiscal_emisor = await regimenFiscalModel.findOne({
      where: {
        id_RegimenFiscal: id_RegimenFiscal_emisor
      },
      //attributes: ['c_RegimenFiscal']
    });
    let c_RegimenFiscalReceptor = await regimenFiscalModel.findOne({
      where: {
        id_RegimenFiscal: id_RegimenFiscalReceptor
      },
    });
    let c_MetodoPago = await metodoPagosModel.findOne({
      where: {
        id_MetodoPago: id_MetodoPago
      },
    });
    /*let c_FormaPago= await formaPagosModel.findOne({
            where: {id_FormaPago},
        });*/
    let c_UsoCFDI = await usosCFDIModel.findOne({
      where: {
        id_UsoCFDI
      },
    });

    /**USING A RAW QUERY FOR US TO NOT CREATE A MODEL AND QUERYING DIRECT FROM THE DATA BASE,
     * WE NEED TO SANITIZE THE INPUT THOUGH!
     */
    let st_ObjetoImp = await sequelize.query(
      "SELECT c_ObjetoImp FROM c_ObjetoImp WHERE id_ObjetoImp = ?", {
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
    
    
    var JsonStructureCFDI = {
      "cfdi:Comprobante": {
        $: {
          "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xmlns:cartaporte20": "http://www.sat.gob.mx/CartaPorte20",
          "xsi:schemaLocation": "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd http://www.sat.gob.mx/CartaPorte20 http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte20.xsd",
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
        "cfdi:Conceptos": [{
          "cfdi:Concepto": [{
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
          }, ],
        }, ],
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
                  PermSCT: `test`,
                  NumPermisoSCT: "NumPermisoSCT"
                },

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
            IDUbicacion: `${ubicaciones[i].st_IdUbicacion}`,
            NombreRemitenteDestinatario: `${ubicaciones[i].st_RemitenteNombre}`,
          },
          "cartaporte20:Domicilio": {
            $: {
              // Domicilio properties here
              Calle: `${ubicaciones[i].Domicilio.st_Calle}`,
              Colonia: `${ubicaciones[i].Domicilio.id_Colonia}`,
              Localidad: `${ubicaciones[i].Domicilio.id_Localidad}`,
              Municipio: `${ubicaciones[i].Domicilio.id_Municipio}`,
              Estado: `${ubicaciones[i].Domicilio.id_Estado}`,
              Pais: "MEX",
              CodigoPostal: `${ubicaciones[i].Domicilio.c_codigoPostal}`,
            },
          }
        });
      } else {
        console.log(`Processing 'TipoUbicacion' ${i} equal to 'Destino'`);
        ubicacionesArray.push({
          $: {
            // Ubicacion properties here
            TipoUbicacion: "Destino",
            RFCRemitenteDestinatario: `${ubicaciones[i].st_DestinatarioRFC}`,
            FechaHoraSalidaLlegada: `${ubicaciones[i].st_FechaHoraLlegada}`,
            DistanciaRecorrida: `${ubicaciones[i].DistanciaRecorrida}`,
          },
          "cartaporte20:Domicilio": {
            $: {
              // Domicilio properties here
              Calle: `${ubicaciones[i].Domicilio.st_Calle}`,
              Colonia: `${ubicaciones[i].Domicilio.id_Colonia}`,
              Localidad: `${ubicaciones[i].Domicilio.id_Localidad}`,
              Municipio: `${ubicaciones[i].Domicilio.id_Municipio}`,
              Estado: `${ubicaciones[i].Domicilio.id_Estado}`,
              Pais: "MEX",
              CodigoPostal: `${ubicaciones[i].Domicilio.c_codigoPostal}`,

            },
          }
        });
      }
    }

    var mercanciasArray =
      JsonStructureCFDI["cfdi:Comprobante"]["cfdi:Complemento"][
        "cartaporte20:CartaPorte"
      ]["cartaporte20:Mercancias"]["cartaporte20:Mercancia"];

    var autotransporteArray =
      JsonStructureCFDI["cfdi:Comprobante"]["cfdi:Complemento"][
        "cartaporte20:CartaPorte"
      ]["cartaporte20:Mercancias"]["cartaporte20:Autotransporte"];



      // const autotransportes = req.body.Mercancias.Autotransportes;
      // const mercanciasLength = mercancias.length;
      // console.log(`Length of Mercancias array: ${mercanciasLength}`);
  

    const mercancias = req.body.Mercancias;
    const mercanciasLength = mercancias.length;
    console.log(`Length of Mercancias array: ${mercanciasLength}`);

    for (let i = 0; i < mercanciasLength; i++) {
      const mercancia = mercancias[i];
      // Perform the action for teach mercancia" equal to "Origen"
      console.log(`Pushing mercancia number ${i}: ${mercancia}`);
      mercanciasArray.push({
        $: {
          // Mercancia properties here
          BienesTransp: `${mercancias[i].BienesTransp}`,
          Descripcion: `${mercancias[i].Descripcion}`,
          Cantidad: `${mercancias[i].Cantidad}`,
          ClaveUnidad: `${mercancias[i].ClaveUnidad}`,
          PesoEnKg: `${mercancias[i].PesoEnKg}`,
          MaterialPeligroso: `${mercancias[i].MaterialPeligroso}`,
        },
        "cartaporte20:CantidadTransporta": {
          $: {
            // Domicilio properties here
            Cantidad: `${mercancias[i].CantidadTransporta.Cantidad}`,
            IDOrigen: `${mercancias[i].CantidadTransporta.IDOrigen}`,
            IDDestino: `${mercancias[i].CantidadTransporta.IDDestino}`,
          },
        }
      })
    };



    const remolques = req.body.Mercancias[0].Autotransporte.Remolques;
    console.log(`This is inside the remolques object: ${JSON.stringify(remolques)}`)

    const remolquesLength = remolques.length;
    console.log(`Length of remolques array: ${remolquesLength}`);

    if (remolquesLength!=0) {
      JsonStructureCFDI["cfdi:Comprobante"]["cfdi:Complemento"]["cartaporte20:CartaPorte"]["cartaporte20:Autotransporte"]["cartaporte20:Remolques"] = {
        "cartaporte20:Remolque": [], // puede tener 0-2 remolques
      };
      
      var remolquesArray =
      JsonStructureCFDI["cfdi:Comprobante"]["cfdi:Complemento"][
        "cartaporte20:CartaPorte"
      ]["cartaporte20:Mercancias"]["cartaporte20:Autotransporte"]["cartaporte20:Remolques"]["cartaporte20:Remolque"];
  
      for (let i = 0; i < remolquesLength; i++) {
        const remolque = remolques[i];
        // Perform the action for teach mercancia" equal to "Origen"
        console.log(`Pushing remolque number ${i}: ${remolque}`);
        remolquesArray.push(
          
          { // Mercancia properties here
            Placa: `${remolques[i].st_Placa}`,
            SubTipoRem: `${remolques[i].st_ClaveRemolque}`,
          }
          )
      };
    }else if(remolquesLength==0){
      console.log("There are no remolques to add.")
    }else{
      console.log(`ERROR: You can only a maximum of 2 remolques, you're tring to add ${remolquesLength} remolques. `)
    }
      


    var xmlRaw = builder.buildObject(JsonStructureCFDI, options);
    console.log(`this is generated raw XML${xmlRaw}`);

    let xmlFileName = await createTimestampedXmlFile(xmlRaw);

    handleHttpResponse(res, {
      xmlRaw: `${xmlRaw}`,
      xmlFileName: `${xmlFileName}`,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });

    console.log("Login error: " + e);
    //handleHttpError(res, "ERROR_CREATE_XML");
  }
}

module.exports = {
  createXmlCtrl,
};