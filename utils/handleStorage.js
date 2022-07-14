/**
 * Posible conexion con servicio de almacenamiento S3 de AWS : leifer mendez
 */
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();

    switch (file.fieldname) {
      case "url_TarjetaCirculacion": {
        const filename = `TARCIR-${Date.now()}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_Factura": {
        const filename = `FACT-${Date.now()}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_PermisoSCT": {
        const filename = `PSCT-${Date.now()}.${ext}`;
        cb(null, filename);
        break;
      }
      default:
        const filename = `unknown-${Date.now()}.${ext}`;
        cb(null, filename);
    }
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
