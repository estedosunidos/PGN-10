const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Asignatura');
router.get('/:idAsignatura',async function(req,res,next){
    try {
        res.json(await servicios.getasignatura([req.params.idAsignatura]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getasignaturas());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;