//const boxrec = require("boxrec").Boxrec;
//const fastcsv = require('fast-csv');
//import parse from 'csv-parse/lib/sync';
//const fs = require('fs');
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
var path   = require('path')

var xml2js = require('xml2js');

var fs = require('fs'); 
var parser = new xml2js.Parser();
 

async function createXmlCtrl(req, res){
    try {
        var obj = {
        "cfdi:Comprobante" : {
            $: {
                "xsi:schemaLocation": "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd http://www.sat.gob.mx/CartaPorte20 http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte20.xsd", 
                "xmlns:cartaporte20": "http://www.sat.gob.mx/CartaPorte20",
                "Version": "4.0",
                "Serie": "Serie",
                "Folio": "Folio",
                "Fecha": "2022-07-21T00:18:10",
                "Sello": "e",
                "SubTotal": "0",
                "Moneda": "XXX",
                "Total": "0",
                "TipoDeComprobante": "T",
                "Exportacion": "01",
                "LugarExpedicion": "20000",
                "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                },
                'cfdi:Emisor': {
                    $: {
                    'Rfc': 'EKU9003173C9',
                    "Nombre":"ESCUELA KEMPER URGATE",
                    "RegimenFiscal":"601",
                        }},
                'cfdi:Receptor': {
                    $: {
                    'Rfc': 'EKU9003173C9',
                    "Nombre":"ESCUELA KEMPER URGATE",
                    "DomicilioFiscalReceptor":"26015",
                    "RegimenFiscalReceptor":"601",
                    "UsoCFDI":"S01",
                        },
                },
                "cfdi:Conceptos": [{
                    
                    "concepto":[
                    {   $:{
                        "ClaveProdServ": "78101800",
                        "NoIdentificacion": "UT421511",
                        "Cantidad": "1",
                        "ClaveUnidad": "H87",
                        "Unidad": "Pieza",
                        "Descripcion": "Transporte de carga por carretera",
                        "ValorUnitario": "0.00",
                        "Importe": "Transporte de carga por carretera",
                    }} ]
                       
                    }],

                    "cfdi:Complemento": [{
                        "cartaporte20:CartaPorte":[
                        {   
                            "cartaporte20:Ubicaciones": [{
                                "cartaporte20:Ubicacion": {
                                    "cartaporte20:Domicilio":{
                                        $:{"Calle":"calle"}
                                    },
                                $: {
                                    "IDUbicacion": "OR101010",
                                    "TipoUbicacion": "Origen"
                                },
                                },
                                //"cartaporte20:Ubicacion": "chingatumadre",
                                
                            }
                            ],
                            $ : {"Version": "2.0",
                            "TranspInternac": "No",
                            "TotalDistRec": "1",},
                            "cartaporte20:Mercancias": [{
                                "cartaporte20:test": "UT421511",}
                            ],
                        },
                         ],
                         
                           
                        }]

            }
        };


        var buildOptions = {
            //explicitChildren: true,
            attrkey: '@'
        };

        var builder = new xml2js.Builder();
        var xml = builder.buildObject(obj);

        console.log(xml)
        var timestamp= Date.now()

        /*fs.writeFile('./storage/documentos/cfdi_'+timestamp+'.xml', xml, function(err) {
            if(err) {
                return console.log(err);
            }})
            */



        handleHttpResponse(res, "this is jsut a test");
    } catch (e) {
        console.log("Login error: " + e);
        handleHttpError(res, "ERROR_CREATE_XML");
    }
};

module.exports = {
    createXmlCtrl
  };
  