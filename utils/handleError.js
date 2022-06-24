const handleHttpError= (res, message= 'Algo sucerdio...', code= 403) =>{
    res.status(code);
    res.send    ({error: 'message'});
};

module.exports= {handleHttpError};