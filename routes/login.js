const express=require('express');
const router=express.Router();
const servicios=require('../servicios/login');
router.put('/:Documento',async function(req,res,next){
    try {
        res.json(await servicios.updatedcambiopassword(req.body,req.params.Documento));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;