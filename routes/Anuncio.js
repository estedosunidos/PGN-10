const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Anuncio');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:idAnuncio',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getanucio([req.params.idAnuncio]));
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
        res.json(await servicios.getanucios());
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
        res.json(await servicios.createanuncio(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idAnuncio',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deleteanuncio([req.params.idAnuncio]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idAnuncio',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updateanuncio(req.params.idAnuncio,req.body.Mensaje));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;