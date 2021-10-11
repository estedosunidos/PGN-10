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
    const sql='select cu.IdCurso Id,cu.Grupo,asig.Nombre_Asignatura Asignatura ,trim(concat(us.Nombre," " ,us.Apellido)) Docente from pgn.curso cu inner join pgn.asignatura asig on cu.idAsignatura =asig.idAsignatura inner join pgn.docente doc on cu.idDocente=doc.idDocente  inner join pgn.usuario us on us.Documento = doc.Documento '
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
//funciona
async function createcurso(idCurso){
    console.log(idCurso)
    const sql='INSERT INTO `pgn`.`curso` (`Grupo`,`idAsignatura`,`IdDocente`) VALUES (?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idCurso);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El curso fue creado'}
    }
    return {codigo:'error',descricion:'El curso no fue creado exitosamente'}
}
async function returnGrupo(idAsignatura){
    const sql="select cu.IdCurso Id,cu.Grupo  from pgn.curso cu where idAsignatura=? "
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idAsignatura);
    return resul
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
async function retrunbydocenteasignatura(DocenteAsignatura){
    const sql="select cu.IdCurso Id,cu.Grupo from pgn.docenteasignatura doceasig inner join pgn.curso cu on doceasig.IdDocente = cu.IdDocente and doceasig.IdAsignatura= cu.idAsignatura where doceasig.idDocenteAsignatura=?"
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,DocenteAsignatura);
    return resul
}
//funciona
async function updatecurso(idCurso,Grupo,idAsignatura,IdDocente){
    console.log(idCurso,Grupo,idAsignatura,IdDocente)
    const sql='UPDATE `pgn`.`curso` SET `Grupo` = ?,`idAsignatura` = ?,`IdDocente` = ? WHERE `idCurso` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Grupo,idAsignatura,IdDocente,idCurso]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El curso fue actualizado'}
    }
    return {codigo:'error',descricion:'El curso no fue actualizado  exitosamente'}
}
module.exports={getcurso,getcursos,createcurso,deletecurso,updatecurso,returnGrupo,retrunbydocenteasignatura}
