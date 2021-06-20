const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Franja_Horario');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:idFranja_Horario',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getFranja_Horario([req.params.idFranja_Horario]));
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
        res.json(await servicios.getFranja_horarios());
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
        res.json(await servicios.createFranja_horarios(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idFranja_Horario',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deleteFranja_horarios([req.params.idFranja_Horario]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idFranja_Horario',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updateFranja_horarios(req.params.idFranja_Horario,req.body.HoraInicio,req.body.HoraFinal,req.body.Dia));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;