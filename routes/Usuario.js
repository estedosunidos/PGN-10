const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Usuario');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:Documento',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getusuario([req.params.Documento]));
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
        res.json(await servicios.getusuarios());
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
        res.json(await servicios.createusuario(req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:Documento',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deleteusuario([req.params.Documento]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:Documento',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updatedatousuario(req.params.Documento,req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;