const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Anuncio');
router.get('/:idAnuncio',async function(req,res,next){
    try {
        res.json(await servicios.getanucio([req.params.idAnuncio]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getanucios());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createanuncio(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idAnuncio',async function(req,res,next){
    try {
        res.json(await servicios.deleteanuncio([req.params.idAnuncio]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idAnuncio',async function(req,res,next){
    try {
        res.json(await servicios.updateanuncio(req.params.idAnuncio,Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;