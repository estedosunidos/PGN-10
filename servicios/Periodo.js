const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getperiodos(){
    const sql="select * from pgn.periodo"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function getperiodo(IdPeriodo){
    const sql="select * from pgn.periodo where IdPeriodo =?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,IdPeriodo);
    return resul
}
async function periodobyasignatura(idcursoestudiante){
    const sql="SELECT per.IdPeriodo,per.Descripcion FROM pgn.curso_estudiante cuest INNER JOIN pgn.curso cu on cuest.IdCurso= cu.IdCurso INNER JOIN pgn.periodo per on cu.IdPeriodo=per.IdPeriodo WHERE idCurso_Estudiante=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,idcursoestudiante);
    return resul
}
async function Insertperiodo(Descripcion){
    const sql="insert into pgn.periodo (Descripcion,year,Fecha_Inicio,Fecha_Final) values (?,?,?,?)"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,Descripcion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'se asocio el estudio del docente'}
    }else{
        return {codigo:'error',descricion:'No se pudo asociar el estudio del docente'}
    }
}
async function returnperiodo(idcursoestudiante){
    const sql = 'SELECT C.IdPeriodo, C.Descripcion FROM PGN.CURSO_ESTUDIANTE A INNER JOIN PGN.CURSO B ON (A.IDCURSO = B.IDCURSO) INNER JOIN PGN.PERIODO C ON (B.IDPERIODO = C.IDPERIODO) WHERE A.IDCURSO_ESTUDIANTE = ?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,idcursoestudiante);
    return resul

}
async function Updateperiodo(IdPeriodo,Descripcion,year,Fecha_Inicio,Fecha_Final){
    const sql ='update pgn.periodo set Descripcion=?, year=?,Fecha_Inicio=?,Fecha_Final=? where IdPeriodo=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,[Descripcion,year,Fecha_Inicio,Fecha_Final,IdPeriodo]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El periodo fue actualizado'}
    }else{
        return {codigo:'error',descricion:'El periodo no fue actualizado  exitosamente'}
    }
}
async function deleteperiodo(IdPeriodo){
    const sql='delete from pgn.periodo where IdPeriodo=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,IdPeriodo);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El periodo  fue eliminado'}
    }else{
        return {codigo:'error',descricion:'El periodo  no fue eliminado  exitosamente'}
    }

}
module.exports={deleteperiodo,Updateperiodo,Insertperiodo,getperiodo,getperiodos,returnperiodo,periodobyasignatura}