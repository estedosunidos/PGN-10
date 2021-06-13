const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getNota(idNotas){
    const sql='SELECT * FROM pgn.notas where idNotas=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idNotas);
    return resul
}
async function getNotas(){
    const sql='SELECT * FROM pgn.notas'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createnotas(idNotas){
    const sql='INSERT INTO `pgn`.`notas` ( `Observacion`, `Calificacion`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idNotas);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La notas fue creado'}
    }
    return {codigo:'error',descricion:'La notas no fue creado exitosamente'}
}
async function deletenotas(idNotas){
    const sql='DELETE FROM `pgn`.`notas`` WHERE `idNotas` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idNotas);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La nota fue eliminado'}
    }
    return {codigo:'error',descricion:'La nota no fue eliminado  exitosamente'} 
}
async function updatenotas(idNotas,Obsevacion,Calificacion){
    const sql='UPDATE `pgn`.`notas` SET `Observacion` =?, Calificacion = ? WHERE idNotas = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Obsevacion,Calificacion,idNotas]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La nota fue actualizado'}
    }
    return {codigo:'error',descricion:'La nota no fue actualizado  exitosamente'}
}
module.exports={getNota,getNotas,createnotas,deletenotas,updatenotas}