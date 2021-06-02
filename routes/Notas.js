const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Notas');
router.get('/:idNotas',async function(req,res,next){
    try {
        res.json(await servicios.getNota([req.params.idNotas]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getNotas());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
