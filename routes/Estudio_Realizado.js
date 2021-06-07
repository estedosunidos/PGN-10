const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Estudio_Realizado');
router.get('/:idEstudio_Realizado',async function(req,res,next){
    try {
        res.json(await servicios.getEstudio_Realizado([req.params.idEstudio_Realizado]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getEstudio_Realizados());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createEstudio_Realizados(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idEstudio_Realizado',async function(req,res,next){
    try {
        res.json(await servicios.deleteEstudio_Realizados([req.params.idEstudio_Realizado]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idEstudio_Realizado',async function(req,res,next){
    try {
        res.json(await servicios.updateEstudio_Realizados(req.params.idEstudio_Realizado,Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;