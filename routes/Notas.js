const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Notas');
router.get('/:idNotas',async function(req,res,next){
    try {
        res.json(await servicios.getNotas([req.params.idNotas]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;
