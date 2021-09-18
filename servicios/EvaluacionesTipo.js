const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getidEvaluacionesTipo(idEvaluacionesTipo){
    const sql='SELECT idEvaluacionesTipo Id , Descripcion FROM pgn.evaluacionestipo where idEvaluacionesTipo=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idEvaluacionesTipo);
    return resul
}
async function getEvaluacionesTipos(){
    const sql='SELECT `idEvaluacionesTipo` Id , Descripcion FROM pgn.evaluacionestipo'
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
async function deleteEvalueacionestipo(idEvaluacionesTipo){
    const sql='DELETE FROM `pgn`.`evaluacionestipo` WHERE `idEvaluacionesTipo` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idEvaluacionesTipo);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El evaluacion tipo  fue eliminado'}
    }
    return {codigo:'error',descricion:'El evaluacion tipo  no fue eliminado  exitosamente'}
}
async function updateEvaluacionestipo(idEvaluacionesTipo,Descripcion){
    console.tipo(idEvaluacionesTipo )
    const sql='UPDATE `pgn`.`evaluacionestipo` SET `Descripcion`=?  WHERE idEvaluacionesTipo = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Descripcion,idEvaluacionesTipo]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El evaluacion tipo fue actualizado'}
    }
    return {codigo:'error',descricion:'El evaluacion tipo no fue actualizado  exitosamente'}
}
module.exports={getidEvaluacionesTipo,getEvaluacionesTipos,createEvalueacionestipo,deleteEvalueacionestipo,updateEvaluacionestipo}