const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Administrador');
router.get('/:idAdministrador',async function(req,res,next){
    try {
        res.json(await servicios.getadministrador([req.params.idAdministrador]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        res.json(await servicios.getadministradores());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        res.json(await servicios.createadministrador(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idAdministrador',async function(req,res,next){
    try {
        res.json(await servicios.deleteadministrador([req.params.idAdministrador]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idAdministrador',async function(req,res,next){
    try {
        res.json(await servicios.updateadministrador(req.params.idAdministrador,req.body.Nombre_Asignatura,req.body.Semestre,req.body.Descripcion,req.body.Unidad_de_credito,req.body.Observacion));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
