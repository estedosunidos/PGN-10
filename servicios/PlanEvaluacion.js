const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getPlanEvaluacion(idPlanEvaluacion){
    const sql='SELECT * FROM mydb.PlanEvaluacion where idPlanEvaluacionr=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idPlanEvaluacion);
    return resul
}
module.exports={getPlanEvaluacion}