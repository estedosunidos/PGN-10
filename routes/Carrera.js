const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Carrera');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:idCarrera',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getcarrera([req.params.idCarrera]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getcarreras());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.creatcarrera(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idCarrera',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deletecarrera([req.params.idCarrera]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idCarrera',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updatecarrera(req.params.idCarrera,req.body.Nombre_Carrera,req.body.CantidadSemestre,req.body.TotalCredito,req.body.idAdministrador));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;