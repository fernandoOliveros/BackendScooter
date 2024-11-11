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
    const ext = file.originalname.split(".").pop();

    switch (file.fieldname) {
      case "url_TarjetaCirculacion": {
        const filename = `RTARCIR_${dateShort}${timeShort}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_Factura": {
        const filename = `RFACT_${dateShort}${timeShort}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_PermisoSCT": {
        const filename = `RPSCT_${dateShort}${timeShort}.${ext}`;
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


