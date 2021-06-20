const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Usuario');
const image=require('../utilidades/image');
const auteticacion=require('../utilidades/autenticacion');
router.put('/:Documento',image.cargaimagen,async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updateusuariofoto(req.params.Documento,req.file.path));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;