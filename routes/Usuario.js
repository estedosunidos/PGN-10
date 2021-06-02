const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Usuario');
router.get('/:Documento',async function(req,res,next){
    try {
        res.json(await servicios.getusuario([req.params.Documento]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getusuarios());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;