const express=require('express');
const router= express.Router();

//TODO para localhost/login
router.get('/', (req, rest) =>{
    const data=['hola', 'mundo'];
    rest.send({data});

})


module.exports=router;