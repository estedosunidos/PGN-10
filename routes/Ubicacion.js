const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Ubicacion');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:idUbicacion',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getubicaion([req.params.idUbicacion]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/franjahorario/:idFranja_Horario',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.returnaubicacionbyIdUbicacion([req.params.idFranja_Horario]));
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
        res.json(await servicios.getubicaiones());
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
        res.json(await servicios.createubicacion(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idUbicacion',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deleteubicacion([req.params.idUbicacion]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idUbicacion',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updateubicacion(req.params.idUbicacion,req.body.Capacidad,req.body.Direccion));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;