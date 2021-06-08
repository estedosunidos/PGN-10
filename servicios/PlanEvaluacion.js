const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getPlanEvaluacion(idPlanEvaluacion){
    const sql='SELECT * FROM pgn.planevaluacion where idPlanEvaluacionr=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idPlanEvaluacion);
    return resul
}
async function getPlanEvaluaciones(){
    const sql='SELECT * FROM pgn.planevaluacion'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createPlaEvaluacion(idPlanEvaluacion){
    const sql='INSERT INTO `pgn`.`planevaluacion` (`Descripcion`,`FechaInicialProgramada`,`FechaFinalProgramada`,`Porcentaje`) VALUES (?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idPlanEvaluacion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El plan de evaluacion  fue creado'}
    }
    return {codigo:'error',descricion:'El plan de evaluacion no fue creado exitosamente'}
}
async function deletePlanEvaluacion(idPlanEvaluacion){
    const sql='DELETE FROM `pgn`.`planevaluacion`` WHERE `idPlanEvaluacionr` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idPlanEvaluacion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El plan de evaluacion  fue eliminado'}
    }
    return {codigo:'error',descricion:'El plan de evaluacion  no fue eliminado  exitosamente'} 
}
async function updatePlaEvaluacion(){
    Descripcion.push(idPlanEvaluacion);
    FechaInicialProgramada.push(idPlanEvaluacion);
    FechaFinalProgramada.push(idPlanEvaluacion);
    Porcentaje.push(idPlanEvaluacion);
    const sql='UPDATE `pgn`.`planevaluacion` SET `Descripcion`=?,`FechaInicialProgramada`=?,`FechaFinalProgramada`=?,`Porcentaje`=? WHERE idUbicacion = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Descripcion,FechaInicialProgramada,FechaFinalProgramada,Porcentaje]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El plan de evaluacion fue actualizado'}
    }
    return {codigo:'error',descricion:'El plan de evaluacion  no fue actualizado  exitosamente'}
}
module.exports={getPlanEvaluacion,getPlanEvaluaciones,createPlaEvaluacion,deletePlanEvaluacion,updatePlaEvaluacion}