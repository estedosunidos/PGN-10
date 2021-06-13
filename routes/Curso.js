const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Curso');
router.get('/:idCurso',async function(req,res,next){
    try {
        res.json(await servicios.getcurso([req.params.idCurso]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getcursos());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createcurso(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idCurso',async function(req,res,next){
    try {
        res.json(await servicios.deletecurso([req.params.idCurso]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idCurso',async function(req,res,next){
    try {
        res.json(await servicios.updatecurso(req.params.idCurso,req.body.observacion));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;