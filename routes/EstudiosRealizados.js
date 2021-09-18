const express=require('express');
const router=express.Router();
const servicios=require('../servicios/EstudioRealizado');
const auteticacion=require('../utilidades/autenticacion');
router.get('/:idEstudio_Realizado',async function(req,res,next){
    try{
    const validacion=auteticacion.validaciontoken(req,headers.authorization)
    if(validacion.codigo!=0){
        return res.status(validacion.codigo).json(validacion)
    }
    res.json(await servicios.getestudiorealizado([req.params.idEstudio_Realizado]))
    }catch(error){
        console.error('error',error.message)
        next(error)
    }
})
router.get('/',async function(req,res,next){
    try{
    const validacion=auteticacion.validaciontoken(req,headers.authorization)
    if(validacion.codigo!=0){
        return res.status(validacion.codigo).json(validacion)
    }
    res.json(await servicios.getestudiorealizado())
    }catch(error){
        console.error('error',error.message)
        next(error)
    }
})
router.post('/',async function(req,res,next){
    try {
        //const validacion=auteticacion.validaciontoken(req.headers.authorization);
        //if(validacion.codigo!=0){
          //  return res.status(validacion.codigo).json(validacion)
        //}
        res.json(await servicios.createEstudiorealizado(req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.delete('/:idEstudio_Realizado',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.deleteEstudiorealizado([req.params.idEstudio_Realizado]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/:idEstudio_Realizado',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updateEstudioRealizado(req.params.idEstudio_Realizado,req.body));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;