const express=require('express');
const router=express.Router();
const servicios=require('../servicios/PlanEvaluacion');
router.get('/:idPlanEvaluacion',async function(req,res,next){
    try {
        res.json(await servicios.getPlanEvaluacion([req.params.idPlanEvaluacion]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getPlanEvaluaciones());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createPlaEvaluacion(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idPlanEvaluacion',async function(req,res,next){
    try {
        res.json(await servicios.deletePlanEvaluacion([req.params.idPlanEvaluacion]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idPlanEvaluacion',async function(req,res,next){
    try {
        res.json(await servicios.updatePlaEvaluacion(req.params.idPlanEvaluacion,req.body.Descripcion,req.body.FechaInicialProgramada,req.body.FechaFinalProgramada,req.body.Porcentaje));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;