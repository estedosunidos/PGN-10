const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Carrera');
router.get('/:idCarrera',async function(req,res,next){
    try {
        res.json(await servicios.getcarrera([req.params.idCarrera]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getcarreras());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.creatcarrera(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idCarrera',async function(req,res,next){
    try {
        res.json(await servicios.deletecarrera([req.params.idCarrera]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idCarrera',async function(req,res,next){
    try {
        res.json(await servicios.updatecarrera(req.params.idCarrera,Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;