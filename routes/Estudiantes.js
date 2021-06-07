const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Estudiantes');
router.get('/:idestudiantes',async function(req,res,next){
    try {
        res.json(await servicios.getestudiante([req.params.idEstudiantes]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getestudiantes());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.creteestudiantes(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idestudiantes',async function(req,res,next){
    try {
        res.json(await servicios.deleteestudiantes([req.params.idEstudiantes]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idestudiantes',async function(req,res,next){
    try {
        res.json(await servicio.updateestudiantes(req.params.idEstudiantes,Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
