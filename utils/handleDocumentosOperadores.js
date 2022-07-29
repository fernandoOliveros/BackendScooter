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
const { date, time } = require("./handleDate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage/documentos`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();

    switch (file.fieldname) {
      case "url_SolicitudEmpleo": {
        const filename = `SOLIEM_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_CURP": {
        const filename = `CURP_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_RFC": {
        const filename = `RFC_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_ComprobanteDom": {
        const filename = `COMPD_${date}.${ext}`;
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

/**
 * const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(new Error('should be png or jpeg'), false)
    }
}
const multerStorage = multer.memoryStorage();

const upload = multer({
    storage: multerStorage,
    fileFilter: fileFilter
});
 */
