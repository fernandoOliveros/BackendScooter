const fs = require('fs');
//const CFDI = require('../src/CFDI');
const CFDI = require('cfdi40');


const key = 'CSD_Sucursal_2_CACX7605101P8_20230509_130255.key';
const cer = 'CSD_Sucursal_2_CACX7605101P8_20230509_130255.cer';

const cfdi = new CFDI({
    Serie: 'A',
    Folio: '167ABC',
    Fecha: '2018-01-16T09:33:43',
    SubTotal: '369.83',
    Moneda: 'MXN',
    Total: '429.00',
    TipoDeComprobante: 'I',
    FormaPago: '01',
    MetodoPago: 'PUE',
    LugarExpedicion: '45079'
});

cfdi.emisor({
    Rfc: 'SAT',
    Nombre: 'SAT SA DE CV',
    RegimenFiscal: '601'
});

cfdi.receptor({
    Rfc: 'MALD930428US2',
    Nombre: 'DAVID ISAAC MARTINEZ LOPEZ',
    UsoCFDI: 'G01'
});

const concepto = cfdi.concepto({
    ClaveProdServ: '52121500',
    ClaveUnidad: 'E48',
    NoIdentificacion: '3031130179',
    Cantidad: '1',
    Unidad: 'PZ',
    Descripcion: 'BATITA UNICORNIO',
    ValorUnitario: '369.83',
    Importe: '369.83'
});

concepto.traslado({
    Base: '369.83',
    Impuesto: '002',
    TipoFactor: 'Tasa',
    TasaOCuota: '0.16',
    Importe: '59.17'
});

concepto.agregar(cfdi);

cfdi.impuestos({
    TotalImpuestosTrasladados: '59.17',
    Traslados: [
      {
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.16',
        Importe: '59.17'
      }
    ]
});

cfdi.certificar(cer);

cfdi.xmlSellado(key, '12345678a')
.then(xml => console.log("the xml is", xml))
.catch(err => console.log(err));