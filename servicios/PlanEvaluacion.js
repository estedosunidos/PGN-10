const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getPlanEvaluacion(idPlanEvaluacion){
    const sql='SELECT  plan.FechaInicialProgramada,plan.FechaFinalProgramada,plan.Porcentaje ,EV.Descripcion `Tipo de evaluacion`  FROM pgn.evaluacionestipo EV inner join pgn.planevaluacion plan on EV.idEvaluacionesTipo=plan.idEvaluacionesTipo  where IdPlanEvaluacion=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idPlanEvaluacion);
    return resul
}
async function getPlanEvaluaciones(){
    const sql='SELECT asig.	Nombre_Asignatura "Nombre Asignatura",EV.Descripcion `Tipo de evaluacion`,plan.Descripcion "Actividad/Tema", plan.FechaInicialProgramada "Fecha Inicio" ,plan.FechaFinalProgramada "Fecha Fin" , co.Descripcion,plan.Porcentaje FROM pgn.evaluacionestipo EV inner join pgn.planevaluacion plan on EV.idEvaluacionesTipo=plan.idEvaluacionesTipo inner join pgn.asignaturadocentecorte adc on adc.Idasignaturadocentecorte=plan.Idasignaturadocentecorte inner join pgn.corte co on co.IdCorte=adc.IdCorte inner join pgn.docenteasignatura doasig on doasig.idDocenteAsignatura=adc.IdAsignaturaDocente inner join pgn.asignatura asig on asig.idAsignatura=doasig.IdAsignatura '
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createPlaEvaluacion(idPlanEvaluacion){
    console.log(idPlanEvaluacion)
    const sql='INSERT INTO `pgn`.`planevaluacion` (`Descripcion`,`FechaInicialProgramada`,`FechaFinalProgramada`,`Porcentaje`,`idEvaluacionesTipo`,Idasignaturadocentecorte) VALUES (?,?,?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idPlanEvaluacion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El plan de evaluacion  fue creado'}
    }else{
        return {codigo:'error',descricion:'El plan de evaluacion no fue creado exitosamente'}
    }
}
async function deletePlanEvaluacion(IdPlanEvaluacion){
    const sql='DELETE FROM `pgn`.`planevaluacion` WHERE `IdPlanEvaluacion`= ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,IdPlanEvaluacion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El plan de evaluacion  fue eliminado'}
    }else{
        return {codigo:'error',descricion:'El plan de evaluacion  no fue eliminado  exitosamente'} 
    }
}
async function updatePlaEvaluacion(idPlanEvaluacion,Descripcion,FechaInicialProgramada,FechaFinalProgramada,Porcentaje,idEvaluacionesTipo,Idasignaturadocentecorte){
    const sql='UPDATE `pgn`.`planevaluacion` SET `Descripcion`=?,`FechaInicialProgramada`=?,`FechaFinalProgramada`=?,`Porcentaje`=?,idEvaluacionesTipo=?,Idasignaturadocentecorte=? WHERE IdPlanEvaluacion = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Descripcion,FechaInicialProgramada,FechaFinalProgramada,Porcentaje,idEvaluacionesTipo,Idasignaturadocentecorte,idPlanEvaluacion]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El plan de evaluacion fue actualizado'}
    }else{
        return {codigo:'error',descricion:'El plan de evaluacion  no fue actualizado  exitosamente'}
    }
}
module.exports={getPlanEvaluacion,getPlanEvaluaciones,createPlaEvaluacion,deletePlanEvaluacion,updatePlaEvaluacion}