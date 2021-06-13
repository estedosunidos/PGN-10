const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Asistencia');
router.get('/:idAsistencia',async function(req,res,next){
    try {
        res.json(await servicios.getasistencia([req.params.idAsistencia]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getasistencias());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createasistencia(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idAsistencia',async function(req,res,next){
    try {
        res.json(await servicios.deleteasistencia([req.params.idAsistencia]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idAsistencia',async function(req,res,next){
    try {
        res.json(await servicios.updateasistencia(req.params.idAsistencia,req.body.Asistio));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;