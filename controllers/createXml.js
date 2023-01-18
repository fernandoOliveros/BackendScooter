//const boxrec = require("boxrec").Boxrec;
//const fastcsv = require('fast-csv');
//import parse from 'csv-parse/lib/sync';
//const fs = require('fs');
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const {matchedData} = require('express-validator')
//var path   = require('path')

var xml2js = require('xml2js');

//var fs = require('fs');  

async function createXmlCtrl(req, res){
    try {
        
        const body =matchedData(req);
        const RFC = body.st_RFC;
        console.log(RFC)

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
                    'Rfc': RFC,
                    "Nombre":"ESCUELA KEMPER URGATE",
                    "RegimenFiscal":"601",
                        }},
                'cfdi:Receptor': {
                    $: {
                    'Rfc': "RFC12345",
                    "Nombre":"ESCUELA KEMPER URGATE",
                    "DomicilioFiscalReceptor":"26015",
                    "RegimenFiscalReceptor":"601",
                    "UsoCFDI":"S01",
                        },
                },
                "cfdi:Conceptos": [{
                    
                    "cfdi:Concepto":[
                    {   $:{
                        "ClaveProdServ": "78101800",
                        "NoIdentificacion": "UT421511",
                        "Cantidad": "1",
                        "ClaveUnidad": "H87",
                        "Unidad": "Pieza",
                        "Descripcion": "Transporte de carga por carretera",
                        "ValorUnitario": "0.00",
                        "Importe": "Transporte de carga por carretera",
                    },
                   
                    } ]
                       
                    }],
                    "cfdi:Complemento": [{
                        "cartaporte20:CartaPorte":[
                        {   
                            "cartaporte20:Ubicaciones": {
                                "cartaporte20:Ubicacion": [
                                { $ :{"IDUbicacion":'OR101010', "TipoUbicacion":"Origen", "RFCRemitenteDestinatario":"EKU9003173C9", "FechaHoraSalidaLlegada":"2021-11-01T00:00:00", },

                                "cartaporte20:Domicilio": { $:{"Calle": "calle", "NumeroExterior":"211", "Colonia":"1957", "Localidad":"13", "Referencia":"casa blanca", "Municipio":"011", "Estado":"CMX", "Pais":"MEX", "CodigoPostal":"13250",}} },
                                  { $ :{"IDUbicacion":'DE202020', "TipoUbicacion":"Destino", "RFCRemitenteDestinatario":"AAA010101AAA", "FechaHoraSalidaLlegada":"2021-11-01T01:00:00","DistanciaRecorrida":"1", },

                                  "cartaporte20:Domicilio": { $:{"Calle": "calle", "NumeroExterior":"214", "Colonia":"0347", "Localidad":"23", "Referencia":"casa blanca", "Municipio":"004", "Estado":"COA", "Pais":"MEX", "CodigoPostal":"25350",}} },
                                  //{ "attr3": 'value3' }
                                ]
                              },
                              "cartaporte20:Mercancias": {
                                $ :{
                                    "PesoBrutoTotal":"1.0",
                                    "UnidadPeso":"XBX",
                                    "NumTotalMercancias":"1",
                                },
                                "cartaporte20:Mercancia":{
                                    $:{
                                    "BienesTransp":"11121900" ,"Descripcion":"Accesorios de equipo de telefonía", "Cantidad":"1.0" ,"ClaveUnidad":"XBX" ,"PesoEnKg":"1.0" ,"MaterialPeligroso":"No",
                                    },
                                    "cartaporte20:CantidadTransporta": {
                                        $:{
                                            "Cantidad":"1", "IDOrigen":"OR101010" ,"IDDestino":"DE202020",
                                        }
                                    }
                                },
                                "cartaporte20:Autotransporte":{
                                    $:{"PermSCT":"TPAF01", "NumPermisoSCT":"NumPermisoSCT" },
                                    
                                    "cartaporte20:IdentificacionVehicular":{$:{"ConfigVehicular":"VL" ,"PlacaVM":"plac892", "AnioModeloVM":"2020"}},
                                    
                                    "cartaporte20:Seguros":{
                                        $:{"AseguraCarga":"SW Seguros", "AseguraRespCivil":"SW Seguros", "PolizaRespCivil":"123456789"}},
                                    "cartaporte20:Remolques": {
                                        "cartaporte20:Remolque":{
                                            $:{"SubTipoRem":"CTR004", "Placa":"VL45K98"}
                                        }
                                    }

                                }
                                },
                            "cartaporte20:FiguraTransporte":{
                                "cartaporte20:TiposFigura":{
                                    $:{ "TipoFigura":"01", "RFCFigura":"VAAM130719H60", "NumLicencia":"a234567890"}
                                }
                            }
                              
                            },
                            ],
                            $ : {"Version": "2.0",
                            "TranspInternac": "No",
                            "TotalDistRec": "1",},
                            
                        },
                         ],

            }
        };

        const options = {
            rootName: 'cfdi:Comprobante',
            headless: true,
            attrNodeName: 'cartaporte20:Ubicacion',
            cdata: true
          };

        var builder = new xml2js.Builder();
        var xml = builder.buildObject(obj, options);

        console.log(xml)
        /*
        var timestamp= Date.now()

        fs.writeFile('./storage/documentos/cfdi_'+timestamp+'.xml', xml, function(err) {
            if(err) {
                return console.log(err);
            }})
         */   

        handleHttpResponse(res, xml);
    } catch (e) {
        console.log("Login error: " + e);
        handleHttpError(res, "ERROR_CREATE_XML");
    }
};

module.exports = {
    createXmlCtrl
  };
  