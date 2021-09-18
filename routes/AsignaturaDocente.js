const express=require('express');
const router=express.Router();
const servicios=require('../servicios/AsignaturaDocente');
const servicio2=require('../servicios/Estudiantes')
const auteticacion=require('../utilidades/autenticacion');
router.post('/',async function(req,res,next){
    try {
       const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.asociarasignatura(req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idDocenteAsignatura',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.desaciarasignatura([req.params.idDocenteAsignatura]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idDocenteAsignatura',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.uptadeasociarasignatura(req.params.idDocenteAsignatura,req.body.IdDocente,req.body.IdAsignatura));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;