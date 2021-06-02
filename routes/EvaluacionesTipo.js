const express=require('express');
const router=express.Router();
const servicios=require('../servicios/EvaluacionesTipo');
router.get('/:idEvaluacionesTipor',async function(req,res,next){
    try {
        res.json(await servicios.getEvaluacionesTipo([req.params.idEvaluacionesTipo]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getEvaluacionesTipos());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;