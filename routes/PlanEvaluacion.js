const express=require('express');
const router=express.Router();
const servicios=require('../servicios/PlanEvaluacion');
router.get('/:idPlanEvaluacion',async function(req,res,next){
    try {
        res.json(await servicios.getPlanEvaluacion([req.params.idPlanEvaluacion]));
    } catch (error) {
        console.error('error', error.message);
        next(error);
    }
});
module.exports=router;