/**
 * Posible conexion con servicio de almacenamiento S3 de AWS : leifer mendez
 */

/**
 * PREFIJOS : 
url_SolicitudEmpleo – SOLIEM
url_CURP – CURP
url_RFC - RFC
url_ComprobanteDom- COMPD
 */
const multer = require("multer");
const { dateShort, timeShort } = require("./handleDate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage/documentos`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const idOp = req.foundDataRow.dataValues.id_Operador;
    const idDoc = req.foundDataRow.dataValues.id_Documento;

    const ext = file.originalname.split(".").pop();

    switch (file.fieldname) {
      case "url_CURP": {
        const filename = `CURP_${dateShort}${timeShort}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_RFC": {
        const filename = `RFC_${dateShort}${timeShort}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_ComprobanteDom": {
        const filename = `COMPD_${dateShort}${timeShort}.${ext}`;
        cb(null, filename);
        break;
      }
      default:
        const filename = `unknown.${dateShort}${timeShort}${ext}`;
        cb(null, filename);
    }
  },
});

const uploadMiddleware = multer({ storage });

module.exports = {uploadMiddleware};


