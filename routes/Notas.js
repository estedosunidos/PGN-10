const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Notas');
router.get('/:idNotas',async function(req,res,next){
    try {
        res.json(await servicios.getNota([req.params.idNotas]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getNotas());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createnotas(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idNotas',async function(req,res,next){
    try {
        res.json(await servicios.deletenotas([req.params.idNotas]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idNotas',async function(req,res,next){
    try {
        res.json(await servicios.updatenotas(req.params.idNotas,req.body.Obsevacion,req.body.Calificacion));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
