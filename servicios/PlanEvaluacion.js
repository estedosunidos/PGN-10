const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getPlanEvaluacion(idPlanEvaluacion){
    console.log("ssss",idPlanEvaluacion)
    const sql='SELECT  plan.FechaInicialProgramada,plan.FechaFinalProgramada,plan.Porcentaje ,EV.Descripcion `Tipo de evaluacion`  FROM pgn.evaluacionestipo EV inner join pgn.planevaluacion plan on EV.idEvaluacionesTipo=plan.idEvaluacionesTipo where IdPlanEvaluacion=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idPlanEvaluacion);
    return resul
}
async function getPlanEvaluaciones(){
    const sql='SELECT plan.FechaInicialProgramada,plan.FechaFinalProgramada,plan.Porcentaje ,EV.Descripcion `Tipo de evaluacion` FROM pgn.evaluacionestipo EV inner join pgn.planevaluacion plan on EV.idEvaluacionesTipo=plan.idEvaluacionesTipo'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createPlaEvaluacion(idPlanEvaluacion){
    const sql='INSERT INTO `pgn`.`planevaluacion` (`Descripcion`,`FechaInicialProgramada`,`FechaFinalProgramada`,`Porcentaje`,`idEvaluacionesTipo`) VALUES (?,?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idPlanEvaluacion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El plan de evaluacion  fue creado'}
    }
    return {codigo:'error',descricion:'El plan de evaluacion no fue creado exitosamente'}
}
async function deletePlanEvaluacion(IdPlanEvaluacion){
    console.log(IdPlanEvaluacion)
    const sql='DELETE FROM `pgn`.`planevaluacion` WHERE `IdPlanEvaluacion`= ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idPlanEvaluacion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El plan de evaluacion  fue eliminado'}
    }
    return {codigo:'error',descricion:'El plan de evaluacion  no fue eliminado  exitosamente'} 
}
async function updatePlaEvaluacion(idPlanEvaluacion,Descripcion,FechaInicialProgramada,FechaFinalProgramada,Porcentaje){
    const sql='UPDATE `pgn`.`planevaluacion` SET `Descripcion`=?,`FechaInicialProgramada`=?,`FechaFinalProgramada`=?,`Porcentaje`=? WHERE IdPlanEvaluacion = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Descripcion,FechaInicialProgramada,FechaFinalProgramada,Porcentaje,idPlanEvaluacion]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El plan de evaluacion fue actualizado'}
    }
    return {codigo:'error',descricion:'El plan de evaluacion  no fue actualizado  exitosamente'}
}
module.exports={getPlanEvaluacion,getPlanEvaluaciones,createPlaEvaluacion,deletePlanEvaluacion,updatePlaEvaluacion}