const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Franja_Horario');
router.get('/:idFranja_Horario',async function(req,res,next){
    try {
        res.json(await servicios.getFranja_Horario([req.params.idFranja_Horario]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getFranja_horarios());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;