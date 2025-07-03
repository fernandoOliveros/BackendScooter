const { sequelize } = require("../config/mysql");
const { cfdiModel, prodServCFDIModel, cartaPorteModel, prodServCartaPorteModel, direccionOrigenCPModel, direccionDestinoCPModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { handleHttpResponse } = require("../utils/handleResponse");
const { QueryTypes } = require("sequelize");

const createCartaPorteV2  =  async(req, res) => {
   const t = await sequelize.transaction();
    try {
        // info del ususario
        const { user } = req;
        const { general, cfdi, productCfdi, arrOrigenes, arrDestinos, arrProductos } = req.body;

        // calculamos el total
        let total = calcularTotalCfdi(cfdi, productCfdi);
        
        // CFDI
        let nuevoCFDI = null;
        if (cfdi) {
            // Completamos arreglo de cfdi
            cfdi.id_Empresa = user.id_Empresa;
            cfdi.id_Viaje = general.id_Viaje;
            cfdi.dec_SubTotal = productCfdi.dec_ImporteConcepto;
            cfdi.dec_Total = total;
            nuevoCFDI = await cfdiModel.create(cfdi, { transaction: t});
        }

        // Producto Servicio CFDI
        let nuevoProductoCFDI = null;
        if(nuevoCFDI.id_CFDI){
            productCfdi.id_CFDI = nuevoCFDI.id_CFDI;
            nuevoProductoCFDI = await prodServCFDIModel.create(productCfdi, { transaction: t});
        }

        // CartePorte
        let nuevaCartaPorte = null;
        if(nuevoCFDI.id_CFDI){
            let folio_int_cp_new = 1;
            let pesoBrutoMercancias = 0;
            let totalDistanciaRecorrida = 0;

            //obtenemos el ultimo folio cp de la empresa
            const query="SELECT MAX(cp.folio_int_cp) as folio_int_cp FROM  tbl_cartaporte cp left join tbl_cfdi cfdi on cfdi.id_CFDI = cp.id_CFDI WHERE cfdi.id_Empresa =:id";
            const dataQuery = await sequelize.query(query, {
                replacements: { id: `${user.id_Empresa}`},
                type: QueryTypes.SELECT,
            });
            
            // le sumamos +1 para el nuevo folio
            if(dataQuery.length > 0 && dataQuery[0].folio_int_cp != null){
                folio_int_cp_new = +(dataQuery[0].folio_int_cp + 1);
            }
            
            // Se calcula el peso bruto de mercancías
            arrProductos.forEach(producto => {
                pesoBrutoMercancias += +(producto?.dec_PesoEnKg ?? 0);
            });

            // se calcula Distancia reccorida de todo el viaje cp
            arrDestinos.forEach(destino => {
                totalDistanciaRecorrida += +(destino?.dec_DistRec);
            });

            // Se setea las variables y se guarda la cp
            general.id_CFDI = nuevoCFDI.id_CFDI;
            general.dec_PesoBrutoTotalMercancias = pesoBrutoMercancias;
            general.i_NumTotalMercancias = arrProductos.length;
            general.dec_TotalDistRec = totalDistanciaRecorrida;
            general.folio_int_cp = folio_int_cp_new;
            nuevaCartaPorte = await cartaPorteModel.create(general, { transaction: t });
        }
    await t.commit();
        handleHttpResponse(res, nuevaCartaPorte);
    } catch (error) {
        await t.rollback();
        console.log(error);
        handleHttpError(res, error.message);
    }
}

const getCartaPorteByIdV2 = async (req, res) => {
    const {user} = req;
    const id_CartaPorte = parseInt(req.params.id);

    let query = "SELECT cp.* FROM tbl_cartaporte cp INNER JOIN tbl_cfdi cfdi ON cfdi.id_CFDI = cp.id_CFDI WHERE cp.id_CartaPorte =:idCartaPorte AND cfdi.id_Empresa =:idEmpresa ;";
    const dataQuery = await sequelize.query(query, {
            replacements: { idEmpresa: `${user.id_Empresa}`, idCartaPorte: id_CartaPorte},
            type: QueryTypes.SELECT,
        });
    console.log("Querie: " + dataQuery);
    handleHttpResponse(res, dataQuery.shift());
}


const calcularTotalCfdi = (cfdi, productCfdi) =>{
    // * Si el comprobante es 1 (Ingreso entonces si hay total) de lo contrario se manda 0
    let total = 0;
    if(cfdi.id_TipoComprobante === 1){
        //* Valida si es con desglose de impuesto(2) y que las cantidad no vengan vacias
        if( productCfdi.id_ObjetoImp === 2 && productCfdi.dec_ImporteConcepto != null && productCfdi.dec_ImporteTraslado != null && productCfdi.dec_ImporteRetencion != null){
            total = (productCfdi.dec_ImporteConcepto + productCfdi.dec_ImporteTraslado) - productCfdi?.dec_ImporteRetencion; 
        }else{
            //* total es igual al subtotal porque no requieres desglose de impuesto
            total = productCfdi.dec_ImporteConcepto;
        }
    }
    return total;
}   


module.exports = {
  createCartaPorteV2,
  getCartaPorteByIdV2
};