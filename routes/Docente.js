const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Docente');
router.get('/:idDocente',async function(req,res,next){
    try {
        res.json(await servicios.getDOCENTE([req.params.idDocente]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getdocentes());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createdocente(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idDocente',async function(req,res,next){
    try {
        res.json(await servicios.deletedocente([req.params.idDocente]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idDocente',async function(req,res,next){
    try {
        res.json(await servicios.updatedocente(req.params.idDocente,Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
