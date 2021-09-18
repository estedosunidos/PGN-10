const express=require('express');
const router=express.Router();
const servicios=require('../servicios/CarreraEstudiante');
const servicios2=require('../servicios/Estudiantes');
const auteticacion=require('../utilidades/autenticacion');
router.post('/',async function(req,res,next){
    try {
       const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.asociarcarrera(req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idCarrera_Estudiante',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.desaciarcarrera([req.params.idCarrera_Estudiante]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idCarrera_Estudiante',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.uptadeasociarcarrera(req.params.idCarrera_Estudiante,req.body.IdCarrera,req.body.IdEstudiante));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;