const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Curso');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:idCurso',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getcurso([req.params.idCurso]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/docenteasignatura/:idasignaturacarrera',async function(req,res,next){
    try {
        console.log(1)
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.returnasignaturbyidasinaturacarrera([req.params.idasignaturacarrera]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/asignaturacurso/:idcarreraestudiante',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.returnasignaturbyidasinaturacarrerayidestudiante([req.params.idcarreraestudiante]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/asignatura/:idAsignatura',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.returnGrupo([req.params.idAsignatura]));
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
        res.json(await servicios.getcursos());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/cursomatriculado/:idcarreraestudiante/:idasignaturacarrera',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.returnasignaturamatricula(req.params.idcarreraestudiante,req.params.idasignaturacarrera));
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
        res.json(await servicios.createcurso(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/cursoestudiante',async function(req,res,next){
    try {
       const validacion=auteticacion.validaciontoken(req.headers.authorization);
       if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.insertincurso_estudiante(Object.values(req.body)));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idCurso',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deletecurso([req.params.idCurso]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/cursoestudiante/:idCurso_Estudiante',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deletecurso_estudiante([req.params.idCurso_Estudiante]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idCurso',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updatecurso(req.params.idCurso,req.body.Grupo,req.body.idAsignatura,req.body.IdDocente,req.body.IdPeriodo));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;