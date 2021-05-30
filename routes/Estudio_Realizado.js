const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Estudio_Realizado');
router.get('/:idEstudio_Realizado',async function(req,res,next){
    try {
        res.json(await servicios.getEstudio_Realizado([req.params.idEstudio_Realizado]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;