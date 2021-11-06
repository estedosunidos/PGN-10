const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getasignatura(idAsignatura){
    const sql='SELECT * FROM pgn.asignatura where idAsignatura=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idAsignatura);
    return resul
}
async function returnasignaturabyestudiante(idestudiante){
    const sql="SELECT cuest.idCurso_Estudiante,asig.Nombre_Asignatura FROM pgn.curso_estudiante cuest INNER JOIN pgn.curso cu ON cuest.IdCurso=cu.IdCurso INNER JOIN pgn.asignatura asig on cu.idAsignatura=asig.idAsignatura where cuest.IdEstudiante=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idestudiante);
    return resul

}
//funciona
async function getasignaturas(){
    const sql='SELECT `idAsignatura` Id,`Nombre_Asignatura` Asignatura , `Semestre`, `Descripcion`, `Unidad_de_credito` Creditos, `Observacion`, `Contenido` FROM pgn.asignatura'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}

//funciona
async function createasignatura(asignatura){
    console.log(asignatura)
    const sql='INSERT INTO `pgn`.`asignatura` (`Nombre_Asignatura`, `Semestre`, `Descripcion`, `Unidad_de_credito`, `Observacion`, `Contenido`,`idAdministrador`,`FechaActualizacion`) VALUES (?,?,?,?,?,?,?,current_TIMESTAMP())'
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
// funciona
async function updateasignatura(idAsignatura,Nombre_Asignatura,Semestre,Descripcion,Unidad_de_credito,Observacion,Contenido,idAdministrador){
    const sql='UPDATE `pgn`.`asignatura` SET `Nombre_Asignatura`=?, `Semestre`=?, `Descripcion`=?, `Unidad_de_credito`=?, `Observacion`=? ,`Contenido`=? ,`FechaActualizacion`=current_TIMESTAMP(),`idAdministrador`=? WHERE `idAsignatura` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Nombre_Asignatura,Semestre,Descripcion,Unidad_de_credito,Observacion,Contenido,idAdministrador,idAsignatura]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La asignatura  fue actualizado'}
    }
    return {codigo:'error',descricion:'La asignatura  no fue actualizado  exitosamente'}
}
module.exports={getasignatura,getasignaturas,createasignatura,deleteasignatura,updateasignatura,returnasignaturabyestudiante}