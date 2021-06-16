const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getcurso(idCurso){
    const sql='SELECT * FROM pgn.curso where idCurso=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idCurso);
    return resul
}
//funciona
async function getcursos(){
    const sql='SELECT * FROM pgn.curso'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
//funciona
async function createcurso(Observaciones){
    const sql='INSERT INTO `pgn`.`curso` (`Observacion`) VALUES (?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,Observaciones);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El curso fue creado'}
    }
    return {codigo:'error',descricion:'El curso no fue creado exitosamente'}
}
//funciona
async function deletecurso(idCurso){
    const sql='DELETE FROM `pgn`.`curso` WHERE `idCurso` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idCurso);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El curso fue eliminado'}
    }
    return {codigo:'error',descricion:'El curso no fue eliminado  exitosamente'} 
}
//funciona
async function updatecurso(idCurso,observacion){
    const sql='UPDATE `pgn`.`curso` SET `Observacion` = ? WHERE `idCurso` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[observacion,idCurso]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El curso fue actualizado'}
    }
    return {codigo:'error',descricion:'El curso no fue actualizado  exitosamente'}
}
module.exports={getcurso,getcursos,createcurso,deletecurso,updatecurso}
