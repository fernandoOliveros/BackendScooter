const bcryptjs = require("bcryptjs");

/**
 *  Contraseña sin encryptar : hola01
 * @param {*} passwordPlain 
 */

const encrypte = async(passwordPlain) =>{
    const hash = await bcryptjs.hash(passwordPlain, 10); //segundo parametro, Salt: aleatoriedad del encriptado, entre mas grande mejor pero mas tardado
    return hash;
};
/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async(passwordPlain, hashPassword) =>{
    return await bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = { encrypte, compare };