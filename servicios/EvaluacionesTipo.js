const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getidEvaluacionesTipo(idEvaluacionesTipo){
    const sql='SELECT * FROM mydb.EvaluacionesTipo where idEvaluacionesTipo=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idEvaluacionesTipo);
    return resul
}
module.exports={getidEvaluacionesTipo}