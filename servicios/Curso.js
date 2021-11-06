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
    const sql='select cu.IdCurso Id,cu.Grupo,asig.Nombre_Asignatura Asignatura ,trim(concat(us.Nombre," " ,us.Apellido)) Docente,pe.Descripcion Periodo from pgn.curso cu inner join pgn.asignatura asig on cu.idAsignatura =asig.idAsignatura inner join pgn.docente doc on cu.idDocente=doc.idDocente  inner join pgn.usuario us on us.Documento = doc.Documento inner join pgn.periodo pe on cu.IdPeriodo=pe.IdPeriodo '
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ] =await conectin1.execute(sql,);
    return resul
}
async function returnasignaturbyidasinaturacarrera(idasignaturacarrera){
    console.log(idasignaturacarrera)
    const sql="SELECT cu.IdCurso ,cu.Grupo,us.Nombre,us.Apellido FROM pgn.docenteasignatura asigcar INNER JOIN pgn.asignatura asig on asigcar.IdAsignatura=asig.idAsignatura INNER Join pgn.curso cu on asig.idAsignatura=cu.idAsignatura INNER JOIN pgn.docente doc on cu.IdDocente = doc.idDocente INNER JOIN pgn.usuario us on doc.Documento =us.Documento where asigcar.iddocenteasignatura=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ] =await conectin1.execute(sql,idasignaturacarrera)
    for (let curso of resul){
        let franjas= await returnfranjasbycurs([curso["IdCurso"]])
        curso['Franjas']=franjas
    }

    return resul
}
async function returnasignaturamatricula(IDCARRERAESTUDIANTE,IDASIGNATURA_CARRERA){
    const sql="SELECT 1 FROM PGN.CURSO_ESTUDIANTE A INNER JOIN PGN.CURSO B ON (A.IDCURSO = B.IDCURSO) INNER JOIN PGN.ASIGNATURA_CARRERA C ON (B.IDASIGNATURA = C.IDASIGNATURA) WHERE A.IDCARRERAESTUDIANTE = ?  AND C.IDASIGNATURA_CARRERA = ?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ] =await conectin1.execute(sql,[IDCARRERAESTUDIANTE,IDASIGNATURA_CARRERA]);
    return resul
}
async function returnfranjasbycurs(asignatura_carrera){
    const sql="select date_format(frh.HoraInicio,'%H:%i') HoraInicio ,date_format(frh.HoraFinal,'%H:%i') HoraFinal,frh.Dia,ub.Direccion FROM pgn.franja_horario frh INNER JOIN pgn.ubicacion ub on frh.idUbicacion=ub.idUbicacion where frh.IdCurso=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,asignatura_carrera);
    return resul
}
/*async function returnasignaturbyidasinaturacarrera(idasignaturacarrera){
    const sql="SELECT cu.IdCurso ,cu.Grupo,us.Nombre,us.Apellido FROM pgn.asignatura_carrera asigcar INNER JOIN pgn.asignatura asig on asigcar.IdAsignatura=asig.idAsignatura INNER Join pgn.curso cu on asig.idAsignatura=cu.idAsignatura INNER JOIN pgn.docente doc on cu.IdDocente = doc.idDocente INNER JOIN pgn.usuario us on doc.Documento =us.Documento where asigcar.idAsignatura_Carrera=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ] =await conectin1.execute(sql,idasignaturacarrera)
    for (let curso of resul){
        let franjas= await returnfranjasbycurs([curso["IdCurso"]])
        curso['Franjas']=franjas
    }

    return resul
}*/
async function returnasignaturbyidasinaturacarrerayidestudiante(idcarreraestudiante){
    const sql="SELECT A.IdCurso, B.Grupo, F.Nombre, F.Apellido, G.Nombre_Asignatura ,A.idCurso_Estudiante FROM PGN.CURSO_ESTUDIANTE A INNER JOIN PGN.CURSO B ON (A.IDCURSO = B.IDCURSO) INNER JOIN PGN.CARRERA_ESTUDIANTE D ON (A.IDCARRERAESTUDIANTE = D.IDCARRERA_ESTUDIANTE) INNER JOIN PGN.DOCENTE E ON (B.IDDOCENTE = E.IDDOCENTE) INNER JOIN PGN.USUARIO F ON (E.DOCUMENTO = F.DOCUMENTO) INNER JOIN PGN.ASIGNATURA G ON (B.IDASIGNATURA = G.IDASIGNATURA) WHERE A.IDCARRERAESTUDIANTE = ?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ] =await conectin1.execute(sql,idcarreraestudiante)
    for (let curso of resul){
        let franjas= await returnfranjasbycurs([curso["IdCurso"]])
        curso['Franjas']=franjas
    }

    return resul
}
//funciona
async function createcurso(idCurso){
    const sql='INSERT INTO `pgn`.`curso` (`Grupo`,`idAsignatura`,`IdDocente`,IdPeriodo) VALUES (?,?,?,?)'
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
  
}
async function insertincurso_estudiante(idCurso){
    const sql ="insert into pgn.curso_estudiante (IdCurso,IdEstudiante,Idcarreraestudiante) values(?,?,?)"
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idCurso);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudiante  matriculo su asignatura exitosamente'}
    }
    return {codigo:'error',descricion:'El estudiante no  matriculo su asignatura exitosamente'}
}
async function deletecurso_estudiante(idCurso_Estudiante){
    const sql='DELETE FROM `pgn`.`curso_estudiante` WHERE `idCurso_Estudiante` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idCurso_Estudiante);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudiante elimino el curso matriculado '}
    }
}
    
async function retrunbydocenteasignatura(DocenteAsignatura){
    const sql="select cu.IdCurso Id,cu.Grupo from pgn.docenteasignatura doceasig inner join pgn.curso cu on doceasig.IdDocente = cu.IdDocente and doceasig.IdAsignatura= cu.idAsignatura where doceasig.idDocenteAsignatura=?"
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,DocenteAsignatura);
    return resul
}
//funciona
async function updatecurso(idCurso,Grupo,idAsignatura,IdDocente,IdPeriodo){
    const sql='UPDATE `pgn`.`curso` SET `Grupo` = ?,`idAsignatura` = ?,`IdDocente` = ? ,IdPeriodo=? WHERE `idCurso` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Grupo,idAsignatura,IdDocente,IdPeriodo,idCurso]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El curso fue actualizado'}
    }
    return {codigo:'error',descricion:'El curso no fue actualizado  exitosamente'}
}
module.exports={getcurso,getcursos,createcurso,deletecurso,updatecurso,returnasignaturbyidasinaturacarrera,returnGrupo,retrunbydocenteasignatura,insertincurso_estudiante,deletecurso_estudiante,returnasignaturbyidasinaturacarrerayidestudiante,returnasignaturamatricula}