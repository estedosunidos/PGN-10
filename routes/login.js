const express=require('express');
const router=express.Router();
const servicios=require('../servicios/login');
const auteticacion=require('../utilidades/autenticacion');
router.put('/changepass/:Documento',async function(req,res,next){
    try {
        const validacion=auteticacion.validaciontoken(req.headers.authorization);
        if(validacion.codigo!=0){
            return res.status(validacion.codigo).json(validacion)
        }
        res.json(await servicios.updatedcambiopassword(req.body,req.params.Documento));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.put('/logout/:Documento',async function(req,res,next){
    try {
        res.json(await servicios.cierreseccion(req.params.Documento));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
router.post('/login',async function(req,res,next){
    try {
       res.json(await servicios.autenticacion(req.body.Nombre_de_Usuario,req.body.Contraseña));
    } catch (error) {
        console.error('error', error.message);
       next(error);
    }
});
module.exports=router;
