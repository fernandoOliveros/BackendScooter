const handleHttpResponse = (res, data = {message: 'Success process...'}, code= 200 ) =>{
    res.status(code);
    res.send({data, success:true});
};

module.exports = {handleHttpResponse};