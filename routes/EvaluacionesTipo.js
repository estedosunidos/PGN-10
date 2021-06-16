const express=require('express');
const router=express.Router();
const servicios=require('../servicios/EvaluacionesTipo');
router.get('/:idEvaluacionesTipo',async function(req,res,next){
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
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createEvalueacionestipo(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idEvaluacionesTipo',async function(req,res,next){
    try {
        res.json(await servicios.deleteEvalueacionestipo([req.params.idEvaluacionesTipo]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idEvaluacionesTipo',async function(req,res,next){
    try {
        res.json(await servicios.updateEvaluacionestipo(req.params.idEvaluacionesTipo,req.body.Descripcion));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;