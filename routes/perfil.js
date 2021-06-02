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
module.exports=router;

