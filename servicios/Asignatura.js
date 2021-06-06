const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getasignatura(idAsignatura){
    const sql='SELECT * FROM pgn.asignatura where idAsignatura=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idAsignatura);
    return resul
}
async function getasignaturas(){
    const sql='SELECT * FROM pgn.asignatura'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createasignatura(asignatura){
    const sql='INSERT INTO `pgn`.`asignatura` (`Nombre_Asignatura`, `Semestre`, `Descripcion`, `Unidad_de_credito`, `Observacion`, `Contenido`,`idAdministrador`) VALUES (?,?,?,?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,asignatura);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La asignatura fue creado'}
    }
    return {codigo:'error',descricion:'La asignatura  no fue creado exitosamente'}
}
async function deleteasignatura(idAsignatura){
   const sql='DELETE FROM `pgn`.`asignatura` WHERE `idAsignatura` = ?'
   const conection1=await mysql2.createConnection(conection.db);
   const [resul,]=await conection1.execute(sql,idAsignatura);
   if(resul.affectedRows){
    return {codigo:'ok',descricion:'La asignatura fue eliminado'}
}
return {codigo:'error',descricion:'La asignatura no fue eliminado  exitosamente'}
}
module.exports={getasignatura,getasignaturas,createasignatura,deleteasignatura}