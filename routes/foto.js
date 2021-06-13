const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Usuario');
const image=require('../utilidades/image');
router.put('/:Documento',image.cargaimagen,async function(req,res,next){
    try {
        res.json(await servicios.updateusuariofoto(req.params.Documento,req.file.path));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;