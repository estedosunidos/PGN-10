const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Estudiantes');
router.get('/:idestudiantes',async function(req,res,next){
    try {
        res.json(await servicios.getperfil([req.params.idestudiantes]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
