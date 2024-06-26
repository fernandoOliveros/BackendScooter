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
const { date, time } = require("./handleDate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage/documentos`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const idUni = req.findDataRow.dataValues.id_Unidad;
    const idDoc = req.findDataRow.dataValues.id_Documento;

    const ext = file.originalname.split(".").pop();

    switch (file.fieldname) {
      case "url_TarjetaCirculacion": {
        const filename = `${idDoc}_${idUni}_UTARCIR_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_Factura": {
        const filename = `${idDoc}_${idUni}_UFACT_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_PermisoSCT": {
        const filename = `${idDoc}_${idUni}_UPSCT_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      default:
        const filename = `${idDoc}_${idUni}_UUnknown-${Date.now()}.${ext}`;
        cb(null, filename);
    }
  },
});

const uploadMiddleware = multer({ storage });

module.exports = { uploadMiddleware };
