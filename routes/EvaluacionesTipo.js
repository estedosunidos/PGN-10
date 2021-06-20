const express=require('express');
const router=express.Router();
const servicios=require('../servicios/EvaluacionesTipo');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:idEvaluacionesTipo',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getEvaluacionesTipo([req.params.idEvaluacionesTipo]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getEvaluacionesTipos());
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
        res.json(await servicios.createEvalueacionestipo(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idEvaluacionesTipo',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deleteEvalueacionestipo([req.params.idEvaluacionesTipo]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idEvaluacionesTipo',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updateEvaluacionestipo(req.params.idEvaluacionesTipo,req.body.Descripcion));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;