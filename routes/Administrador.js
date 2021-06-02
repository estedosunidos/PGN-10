const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Administrador');
router.get('/:idAdministrador',async function(req,res,next){
    try {
        res.json(await servicios.getadministrador([req.params.idAdministrador]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getadministradores());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
