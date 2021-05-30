const express=require('express');
const router=express.Router();
const servicios=require('../servicios/Carrera');
router.get('/:idCarrera',async function(req,res,next){
    try {
        res.json(await servicios.getcarrera([req.params.idCarrera]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;