const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Docente');
router.get('/:idDocente',async function(req,res,next){
    try {
        res.json(await servicios.getDOCENTE([req.params.idDocente]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getdocentes());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
