const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getidEvaluacionesTipo(idEvaluacionesTipo){
    const sql='SELECT * FROM pgn.evaluacionestipo where idEvaluacionesTipo=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idEvaluacionesTipo);
    return resul
}
async function getEvaluacionesTipos(){
    const sql='SELECT * FROM pgn.evaluacionestipo'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createEvalueacionestipo(idEvaluacionesTipo){
    const sql='INSERT INTO `pgn`.`evaluacionestipo` (`Descripcion`) VALUES (?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idEvaluacionesTipo);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'el tipo de evaluacion fue creado'}
    }
    return {codigo:'error',descricion:'El tipo de evaluacion no fue creado exitosamente'}
}
async function deleteEvalueacionestipo(){

}
async function updateEvaluacionestipo(){

}
module.exports={getidEvaluacionesTipo,getEvaluacionesTipos,createEvalueacionestipo,deleteEvalueacionestipo,updateEvaluacionestipo}