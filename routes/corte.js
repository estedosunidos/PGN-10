const express=require('express');
const router=express.Router();
const servicios=require('../servicios/corte');
const servicio1=require('../servicios/Docente')
const auteticacion=require('../utilidades/autenticacion');
router.get('/',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getcortes());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/:IdCorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
       }
        res.json(await servicios.getcorte(req.params.IdCorte));
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
        res.json(await servicios.createcorte(req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.delete('/:IdCorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
       }
        res.json(await servicios.deletecorte(req.params.IdCorte));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.put('/:IdCorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
          return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updatecorte(req.params.IdCorte,req.body.Descripcion));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
module.exports=router;