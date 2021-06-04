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
module.exports=router;