const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Notas');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:idNotas',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getNota([req.params.idNotas]));
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
        res.json(await servicios.getNotas());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/retornanota/:idcursoestudiante/:idperido',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.returnanota(req.params.idcursoestudiante,req.params.idperido));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/estudiante/:idCurso/:idPlanEvaluacion/:iddocente',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
       
       }
        res.json(await servicios.returnestudiante([req.params.iddocente,req.params.idPlanEvaluacion,req.params.idCurso]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/asignaturacorte/:idCorte/:IdAsignaturaDocente',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
       
       }
        res.json(await servicios.returnlaactividadesdependedeidcorteyidasignatura([req.params.IdAsignaturaDocente,req.params.idCorte]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.get('/returnperiodobycarreraestudiante/:idcarreraestudiante',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
       
       }
        res.json(await servicios.returnperiodobycarreraestudiante([req.params.idcarreraestudiante]));
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
        res.json(await servicios.createnotas(req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idNotas',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deletenotas([req.params.idNotas]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idNotas',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updatenotas(req.params.idNotas,req.body.Observacion,req.body.Calificacion));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
