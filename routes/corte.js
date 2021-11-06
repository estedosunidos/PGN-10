const express=require('express');
const router=express.Router();
const servicios=require('../servicios/corte');
const servicio1=require('../servicios/Docente')
const auteticacion=require('../utilidades/autenticacion');
router.get('/',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.getcortes());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/asignaturaporcorte',async function(req,res,next){
    console.log("eee")
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicio1.createcortebyasignatura(req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.get('/asignaturacorte/:Idasignaturadocentecorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.returncortebyasignatura(req.params.Idasignaturadocentecorte));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.get('/asignaturadocentecorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicio1.getAsignaturaDocenteCortes());
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.get('/asignaturasdocentescortes/:Idasignaturadocentecorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicio1.getAsignaturaDocenteCorte(req.params.Idasignaturadocentecorte));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/asignaturadocentecorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
       }
        res.json(await servicio1.InsertAsignaturaDocenteCorte(req.body.IdAsignaturaDocente,req.body.IdCorte,req.body.Pocentaje));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.delete('/asignaturadocentecorte/:Idasignaturadocentecorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
       }
        res.json(await servicio1.deleteAsignaturaDocenteCorte(req.params.Idasignaturadocentecorte));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.put('/asignaturadocentecorte/:Idasignaturadocentecorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
          return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicio1.UpdateAsignaturaDocenteCorte(req.params.Idasignaturadocentecorte,req.body.IdAsignaturaDocente,req.body.IdCorte,req.body.porcentaje));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.get('/:IdCorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
       }
        res.json(await servicios.getcorte(req.params.IdCorte));
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
        res.json(await servicios.createcorte(req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.delete('/:IdCorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
           return res.status(validacion.codigo).json(validacion)
       }
        res.json(await servicios.deletecorte(req.params.IdCorte));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
router.put('/:IdCorte',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
          return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updatecorte(req.params.IdCorte,req.body.Descripcion));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
})
module.exports=router;