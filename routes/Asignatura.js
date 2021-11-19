const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Asignatura');
const auteticacion=require('../utilidades/autenticacion');

router.get('/carreraestudiante/:idcarreraestudiante',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.findAsignaturaByCursoEstudiante(req.params.idcarreraestudiante));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});

router.get('/:idAsignatura',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getasignatura([req.params.idAsignatura]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/asignaturadocente/:IdDocenteAsignatura',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.asignacionDocente([req.params.IdDocenteAsignatura]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/asignaturabyestudiante/:idestudiante',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.returnasignaturabyestudiante([req.params.idestudiante]));
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
        res.json(await servicios.getasignaturas());
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
        res.json(await servicios.createasignatura(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idAsignatura',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deleteasignatura([req.params.idAsignatura]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idAsignatura',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updateasignatura(req.params.idAsignatura,req.body.Nombre_Asignatura,req.body.Semestre,req.body.Descripcion,req.body.Unidad_de_credito,req.body.Observacion,req.body.Contenido,req.body.idAdministrador));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;