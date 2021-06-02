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
module.exports=router;
