const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getPlanEvaluacion(idPlanEvaluacion){
    const sql='SELECT * FROM mydb.PlanEvaluacion where idPlanEvaluacionr=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idPlanEvaluacion);
    return resul
}
async function getPlanEvaluaciones(){
    const sql='SELECT * FROM mydb.PlanEvaluacion'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getPlanEvaluacion,getPlanEvaluaciones}