const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getasignatura(idAsignatura){
    const sql='SELECT * FROM pgn.asignatura where idAsignatura=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idAsignatura);
    return resul
}
//funciona
async function getasignaturas(){
    const sql='SELECT * FROM pgn.asignatura'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
//funciona
async function createasignatura(asignatura){
    const sql='INSERT INTO `pgn`.`asignatura` (`Nombre_Asignatura`, `Semestre`, `Descripcion`, `Unidad_de_credito`, `Observacion`, `Contenido`) VALUES (?,?,?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,asignatura);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La asignatura fue creado'}
    }
    return {codigo:'error',descricion:'La asignatura  no fue creado exitosamente'}
}
//funciona
async function deleteasignatura(idAsignatura){
   const sql='DELETE FROM `pgn`.`asignatura` WHERE `idAsignatura` = ?'
   const conection1=await mysql2.createConnection(conection.db);
   const [resul,]=await conection1.execute(sql,idAsignatura);
   if(resul.affectedRows){
    return {codigo:'ok',descricion:'La asignatura fue eliminado'}
}
return {codigo:'error',descricion:'La asignatura no fue eliminado  exitosamente'}
}
//no funciona
async function updateasignatura(idAnuncio,Nombre_Asignatura,Semestre,Descripcion,Unidad_de_credito,Observacion,Contenido){
    const sql='UPDATE `pgn`.`asignatura` SET `Nombre_Asignatura`=?, `Semestre`=?, `Descripcion`=?, `Unidad_de_credito`=?, `Observacion`=? `Contenido`=? WHERE (`idAnuncio` = ?);'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Nombre_Asignatura,Semestre,Descripcion,Unidad_de_credito,Observacion,idAnuncio]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La asignatura  fue actualizado'}
    }
    return {codigo:'error',descricion:'La asignatura  no fue actualizado  exitosamente'}
}
module.exports={getasignatura,getasignaturas,createasignatura,deleteasignatura,updateasignatura}