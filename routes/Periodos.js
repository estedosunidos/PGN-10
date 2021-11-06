const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Periodo');
const auteticacion=require('../utilidades/autenticacion');
const { route } = require('./Docente');
router.get('/',async function(req,res,next){
    try {
        ///const validacion=auteticacion.validaciontoken(req.headers.authorization);
        //if(validacion.codigo!=0){
          //  return res.status(validacion.codigo).json(validacion)
        //}
        res.json(await servicios.getperiodos());
    } catch (error) {
        console.error('error', error.message);
    }
        
})
router.get('/periodobyasignatura/:idcursoestudiante',async function(req,res,next){
    try {
        ///const validacion=auteticacion.validaciontoken(req.headers.authorization);
        //if(validacion.codigo!=0){
          //  return res.status(validacion.codigo).json(validacion)
        //}
        res.json(await servicios.periodobyasignatura([req.params.idcursoestudiante]));
    } catch (error) {
        console.error('error', error.message);
    }
        
})
router.get('/:IdPeriodo',async function(req,res,next){
    try {
        //const validacion=auteticacion.validaciontoken(req.headers.authorization);
        //if(validacion.codigo!=0){
          //  return res.status(validacion.codigo).json(validacion)
        //}
        res.json(await servicios.getperiodo([req.params.IdPeriodo]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.get('/returnaperiodo/:Idcursoestudiante',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.returnperiodo([req.params.Idcursoestudiante]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})

router.post('/',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.Insertperiodo(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.delete('/:IdPeriodo',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deleteperiodo([req.params.IdPeriodo]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.put('/:IdPeriodo',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.Updateperiodo(req.params.IdPeriodo,req.body.Descripcion,req.body.year,req.body.Fecha_Inicio,req.body.Fecha_Final));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
module.exports=router;