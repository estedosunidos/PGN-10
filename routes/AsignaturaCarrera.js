const express=require('express');
const router=express.Router();
const servicio2=require('../servicios/AsignaturaCarrera')
const auteticacion=require('../utilidades/autenticacion');
router.post('/',async function(req,res,next){
    try {
       const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicio2.asociarasignaturaencarrera(req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idAsignatura_Carrera',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicio2.desaciarasignaturaencarrera([req.params.idAsignatura_Carrera]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idAsignatura_Carrera',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicio2.uptadeasociarasignaturaencarrera(req.params.idAsignatura_Carrera,req.body.IdAsignatura,req.body.IdCarrera));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;