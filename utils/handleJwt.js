// const {jsonwebtoken, jwt} = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

/**
 * Pasar el objeto del usuario
 * @param {*} user: id_user, email, id_Empresa
 */

const tokenSign = async (user) => {
  //firmar token
  const sign = await jwt.sign(
    {
      id_User: user.id_User,
      email: user.email,
      id_Empresa: user.id_Empresa,
      //me falta poner el id de la empresa, crear tabla empresa y llave foranea  en Users
    },
    JWT_SECRET,
    {
      expiresIn: "7200s",
    }
  );
  return sign;
};

/**
 * Pasar el token de sesion, el JWT
 * @param {*} tokenJWT
 * @returns
 */
const verifyToken = async (tokenJwt) => {
  //verifica que el token sea firmado de manera correcta por el backend
  try {

    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    console.log("Error verifying JWT:", e)
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
