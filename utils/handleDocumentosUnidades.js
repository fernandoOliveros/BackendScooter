/**
 * Posible conexion con servicio de almacenamiento S3 de AWS : leifer mendez
 */
/**
 * PREFIJOS : 
TarjetaCirculacion – TARCIR
Facturas – FACT
PermisosSCT - PSCT
 */

const multer = require("multer");
const { dateShort, timeShort } = require("./handleDate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage/documentos`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const id_Unidad = req.body.id_Unidad;
    const ext = file.originalname.split(".").pop();
    switch (file.fieldname) {
      case "url_TarjetaCirculacion": {
        const filename = `TARCIR_${dateShort}${timeShort}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_Factura": {
        const filename = `FACT_${dateShort}${timeShort}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_PermisoSCT": {
        const filename = `PERMISOSCT_${dateShort}${timeShort}.${ext}`;
        cb(null, filename);
        break;
      }
      default:
        const filename = `Unknown_${dateShort}${timeShort}.${ext}`;
        cb(null, filename);
    }
  },
});

const uploadMiddleware = multer({ storage });

module.exports = { uploadMiddleware };
