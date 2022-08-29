const handleHttpError= (res, message= 'Algo sucedio...', code= 403) =>{ 
    res.status(code);
    res.send    ({error: message, success: false});
};

module.exports= {handleHttpError};