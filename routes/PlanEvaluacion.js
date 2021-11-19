const express=require('express');
const router=express.Router();
const servicios=require('../servicios/PlanEvaluacion');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:idPlanEvaluacion',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getPlanEvaluacion([req.params.idPlanEvaluacion]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/asignaturadocente/:Idasignaturadocente',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getPlanEvaluaciones(req.params.Idasignaturadocente));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.createPlaEvaluacion(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idPlanEvaluacion',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deletePlanEvaluacion([req.params.idPlanEvaluacion]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idPlanEvaluacion',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updatePlaEvaluacion(req.params.idPlanEvaluacion,req.body.Descripcion,req.body.FechaInicialProgramada,req.body.FechaFinalProgramada,req.body.Porcentaje));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;