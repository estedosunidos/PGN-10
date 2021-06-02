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
module.exports=router;