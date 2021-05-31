const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Ubicacion');
router.get('/:idUbicacion',async function(req,res,next){
    try {
        res.json(await servicios.getcarrera([req.params.idUbicacion]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;