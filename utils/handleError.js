const handleHttpError= (res, message= 'Algo sucedio...', code= 403) =>{  //parametros de arriba, son los de default
    res.status(code);
    res.send    ({error: message, success: false});
};

module.exports= {handleHttpError};