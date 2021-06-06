const express=require('express');
const router=express.Router();
const servicios=require('../servicios/perfil');
router.get('/:idperfil',async function(req,res,next){
    try {
        res.json(await servicios.getperfil([req.params.idperfil]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getperfiles());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createperfil(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idperfil',async function(req,res,next){
    try {
        res.json(await servicios.deleteperfil([req.params.idperfil]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idperfil',async function(req,res,next){
    try {
        res.json(await servicios.updatepefil(req.params.idperfil,Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;

