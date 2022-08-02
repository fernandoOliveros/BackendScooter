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
    //console.log(file)

    let idUni = req.dataDocs.dataValues.id_Unidad;
    let idDoc = req.dataDocs.dataValues.id_Documento;
    console.log(idUni)
    console.log(idDoc)
    const ext = file.originalname.split(".").pop();

    switch (file.fieldname) {
      case "url_TarjetaCirculacion": {
        // fallback to the original name if you don't have a book attached to the request yet.
        const filename = `${idDoc}_TARCIR_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      /*if (req.documentosUnidadesModel) {
          // TODO: consider adding file type extensionreturn 
          let idDoc = request.documentosUnidadesModel.id_Documento;
          console.log( `el ID es ${idDoc}`)
          const filename = `${idDoc}-TARCIR_${date}.${ext}`
          cb(null, filename)
          break;
        }else{
        // fallback to the original name if you don't have a book attached to the request yet.
        const filename = `TARCIR_${date}.${ext}`;
        cb(null, filename);
        break;
      }*/
      case "url_Factura": {
        const filename = `${idDoc}_FACT_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      case "url_PermisoSCT": {
        const filename = `${idDoc}_PSCT_${date}.${ext}`;
        cb(null, filename);
        break;
      }
      default:
        const filename = `${idDoc}_unknown-${Date.now()}.${ext}`;
        cb(null, filename);
        cb(null, filename);
    }
  },
});

const uploadMiddleware = multer({ storage });

/*const renameCtrl= (req, res)=>{
  let idUni = req.dataDocs.dataValues.id_Unidad;
  let idDoc = req.dataDocs.dataValues.id_Documento;
  console.log(idUni)
}*/

module.exports = { uploadMiddleware };
