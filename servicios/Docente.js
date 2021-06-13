const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getDOCENTE(idDocente){
    const sql='SELECT * FROM pgn.docente where idDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idDocente);
    return resul
}
async function getdocentes(){
    const sql='SELECT * FROM pgn.docente'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createdocente(idDocente){
    const sql='INSERT INTO `pgn`.`docente` (`Documento `)  VALUES (?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idDocente);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El docente  fue creado'}
    }
    return {codigo:'error',descricion:'El docente no fue creado exitosamente'}
}
async function deletedocente(idDocente){
    const sql='DELETE FROM `pgn`.`docente` WHERE `idDocente` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idDocente);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El docente fue eliminado'}
    }
    return {codigo:'error',descricion:'El docente no fue eliminado  exitosamente'}
}
async function updatedocente(idDocente,Documento){
    const sql='UPDATE `pgn`.`docente` SET `Documento` = ? WHERE `idestudiante` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Documento,idDocente]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El docente fue actualizado'}
    }
    return {codigo:'error',descricion:'El docente no fue actualizado  exitosamente'}
}
module.exports={getDOCENTE,getdocentes,createdocente,deletedocente,updatedocente}