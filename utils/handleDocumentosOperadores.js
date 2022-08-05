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
const { body } = require("express-validator");
const multer = require("multer");
const { date, time } = require("./handleDate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage/documentos`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    
    /*let idOp = req.dataRow.dataValues.id_Operador;
    let idDoc = req.dataRow.dataValues.id_Documento;
    console.log(idDoc)*/
    console.log("prueba request es", req.dataProof)


    const ext = file.originalname.split(".").pop();

    switch (file.fieldname) {
      case "url_SolicitudEmpleo": {
        const filename = `${idDoc}_${idOp}_SOLIEM_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_CURP": {
        const filename = `${idDoc}_${idOp}_CURP_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_RFC": {
        const filename = `${idDoc}_${idOp}_RFC_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_ComprobanteDom": {
        const filename = `${idDoc}_${idOp}_COMPD_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      default:
        const filename = `${idDoc}_unknown-${Date.now()}.${ext}`;
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
