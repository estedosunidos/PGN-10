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
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getPlanEvaluacion,getPlanEvaluaciones}