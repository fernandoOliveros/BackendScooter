const handleHttpError = ( res, message = 'Internal Server Error', code= 500 ) => {
  res.status(code);
  res.send({error: message});
};

module.exports = {handleHttpError};
  