const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getestudiante(idestudiante){
    const sql='SELECT * FROM pgn.estudiantes where idestudiante=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idestudiante);
    return resul
}
async function getestudiantes(){
    const sql='SELECT * FROM pgn.estudiantes'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function creteestudiantes(idestudiante){
    const sql='INSERT INTO `pgn`.`estudiantes` (`Semestre`,`Documento`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idestudiante);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudiante fue creado'}
    }
    return {codigo:'error',descricion:'El estudiante no fue creado exitosamente'}
}
async function deleteestudiantes(idestudiante){
    const sql='DELETE FROM `pgn`.`estudiantes` WHERE `idestudiante` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idestudiante);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudiante fue eliminado'}
    }
    return {codigo:'error',descricion:'El estudiante no fue eliminado  exitosamente'}
}
async function updateestudiantes(idestudiante,Semestre){
    const sql='UPDATE `pgn`.`estudiantes` SET `Semestre` = ? WHERE `idestudiante` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[idestudiante,Semestre]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El perfil fue actualizado'}
    }
    return {codigo:'error',descricion:'El perfil no fue actualizado  exitosamente'}
}
module.exports={getestudiante,getestudiantes,creteestudiantes,deleteestudiantes,updateestudiantes}
