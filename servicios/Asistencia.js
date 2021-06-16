const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getasistencia(idAsistencia){
    const sql='SELECT * FROM pgn.asistencia where idAsistencia=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idAsistencia);
    return resul 
}
//funciona
async function getasistencias(){
        const sql='SELECT * FROM pgn.asistencia'
        const conectin1=await mysql2.createConnection(conection.db);
        const [resul, ]=await conectin1.execute(sql,);
        return resul
}//funciona
async function createasistencia(idAsistencia){
    const sql='INSERT INTO `pgn`.`asistencia` ( `Asistio`, `Fecha`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idAsistencia);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La asistencia fue creado'}
    }
    return {codigo:'error',descricion:'La asistencia  no fue creado exitosamente'}
}
//funciona
    async function deleteasistencia(idAsistencia){
        const sql='DELETE FROM `pgn`.`asistencia` WHERE `idAsistencia` = ?'
        const conection1=await  mysql2.createConnection(conection.db);
        const [resul,]=await conection1.execute(sql,idAsistencia);
        if(resul.affectedRows){
            return {codigo:'ok',descricion:'La asistencia fue eliminado'}
        }
        return {codigo:'error',descricion:'La asistencia  no fue eliminado  exitosamente'}
}
//  funciona
async function updateasistencia(idAsistencia,Asistio){
    const sql='UPDATE `pgn`.`asistencia` SET `Asistio` = ? WHERE `idAsistencia` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Asistio,idAsistencia]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La asistencia fue actualizado'}
    }
    return {codigo:'error',descricion:'La aistencia  no fue actualizado  exitosamente'}
}

module.exports={getasistencia,getasistencias,createasistencia,deleteasistencia,updateasistencia}