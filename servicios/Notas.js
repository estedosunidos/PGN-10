const res = require('express/lib/response');
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
async function getNotas1(idCurso_Estudiantes,IdDocente,IdPlanEvaluacion){
    const sql="select * from pgn.notas where idCurso_Estudiantes=? and IdDocente=? and IdPlanEvaluacion=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[idCurso_Estudiantes,IdDocente,IdPlanEvaluacion]);
    return resul
}
//async function 
async function returnanota(idcursoestudiante,idperido){
    let notas={}
    const sql="SELECT A.Idasignaturadocentecorte, CONCAT(D.Descripcion,' (',A.Pocentaje,'%)') Descripcion FROM PGN.ASIGNATURADOCENTECORTE A INNER JOIN PGN.DOCENTEASIGNATURA B ON (A.IDASIGNATURADOCENTE = B.IDDOCENTEASIGNATURA) INNER JOIN PGN.CURSO C ON (B.IDDOCENTE = C.IDDOCENTE AND B.IDASIGNATURA = C.IDASIGNATURA) INNER JOIN PGN.CORTE D ON (A.IDCORTE = D.IDCORTE) INNER JOIN PGN.PERIODO E ON (C.IDPERIODO = E.IDPERIODO) INNER JOIN PGN.CURSO_ESTUDIANTE F ON (C.IDCURSO = F.IDCURSO) WHERE F.IDCURSO_ESTUDIANTE = ? AND C.IDPERIODO = ?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[idcursoestudiante,idperido]);
    let promediototal=0
    for (let corte of resul){
        let nota=await returnacalificacion(corte.Idasignaturadocentecorte,idcursoestudiante)
        corte['calificaciones']=nota
        let promedio= await returnpromedio(corte.Idasignaturadocentecorte,idcursoestudiante)
        promediototal=promediototal+(parseFloat(promedio[0].Notacorte) *( promedio[0].Porcentaje) / 100)
        corte['totalcorte']=promedio[0]
    }
    notas["notas"]=resul
    notas["totalpromedioasignatura"]=Number.isNaN(promediototal)?0:promediototal
    return notas
} 
async function returnperiodobycarreraestudiante(idcarreraestudiante){
    console.log(idcarreraestudiante)
    let creditoporsemestre={}
    const sql="SELECT DISTINCT per.IdPeriodo,per.Descripcion FROM pgn.carrera_estudiante carres INNER JOIN curso_estudiante cuest on carres.idCarrera_Estudiante = cuest.Idcarreraestudiante INNER JOIN pgn.curso cu on cu.IdCurso=cuest.IdCurso INNER JOIN pgn.periodo per on per.IdPeriodo=cu.IdPeriodo where carres.idCarrera_Estudiante=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[idcarreraestudiante[0]]);
    let totalcreditoporsemetre=0
    let promediocarrera=0
    for(let periodo of resul){
        let asignaturas=await returncursoestudiantebyidasignatura(idcarreraestudiante,periodo.IdPeriodo)
        totalcreditoporsemetre=totalcreditoporsemetre+asignaturas.credito
        periodo["asignaturas"]=asignaturas.asignaturas
        periodo["creditoporsemestre"]=asignaturas.credito
        periodo["notaporsemetre"]=asignaturas.nota/asignaturas.credito
        promediocarrera=promediocarrera+periodo["notaporsemetre"]/resul.length
    }
    creditoporsemestre["periodos"]=resul
    creditoporsemestre["creditoporasignatura"]=totalcreditoporsemetre
    creditoporsemestre["promediocarrera"]=promediocarrera
    return creditoporsemestre
}
async function returncursoestudiantebyidasignatura(idcarreraestudiante,IdPeriodo){
    let creditoporsemestre={}
    const sql="SELECT cuest.idCurso_Estudiante,asig.Nombre_Asignatura,asig.Unidad_de_credito FROM pgn.carrera_estudiante carres INNER JOIN curso_estudiante cuest on carres.idCarrera_Estudiante = cuest.Idcarreraestudiante INNER JOIN pgn.curso cu on cu.IdCurso=cuest.IdCurso INNER JOIN pgn.asignatura asig on asig.idAsignatura=cu.idAsignatura where carres.idCarrera_Estudiante=? and cu.IdPeriodo=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[idcarreraestudiante[0],IdPeriodo]);
    let totalcretidoporsemetre=0
    let creditopornota=0
    for(let asignatura of resul){
        let notas= await returnanota(asignatura.idCurso_Estudiante,IdPeriodo)
        totalcretidoporsemetre=totalcretidoporsemetre+asignatura["Unidad_de_credito"]
        asignatura["nota"]=notas["totalpromedioasignatura"]
        creditopornota=creditopornota+(asignatura["Unidad_de_credito"]*asignatura["nota"])
        console.log(asignatura["Unidad_de_credito"]*asignatura["nota"])
    }
    creditoporsemestre["credito"]=totalcretidoporsemetre
    creditoporsemestre["nota"]=creditopornota
    creditoporsemestre["asignaturas"]=resul
    return creditoporsemestre
}
async function returnacalificacion(idasignaturadocentecorte,idcursoestudiante){
    const sql="SELECT A.IdPlanEvaluacion, CONCAT(A.Descripcion,' (',A.Porcentaje,'% )') Descripcion, NVL(B.Calificacion, 0) Calificacion FROM PGN.PLANEVALUACION A LEFT JOIN PGN.NOTAS B ON (A.IDPLANEVALUACION = B.IDPLANEVALUACION AND B.IDCURSO_ESTUDIANTES = ?) WHERE A.IDASIGNATURADOCENTECORTE = ?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[idcursoestudiante,idasignaturadocentecorte]);
    return resul
}
async function returnpromedio(idasignaturadocentecorte,idcursoestudiante){
    console.log(idasignaturadocentecorte,idcursoestudiante)
    const sql="select NVL(CAST(SUM((A.Porcentaje * NVL(B.Calificacion, 0)) / 100) AS DECIMAL(4,2)),0) Notacorte, NVL(C.Pocentaje,0) Porcentaje FROM PGN.PLANEVALUACION A LEFT JOIN PGN.NOTAS B ON (A.IDPLANEVALUACION = B.IDPLANEVALUACION AND B.IDCURSO_ESTUDIANTES = ?) INNER JOIN PGN.ASIGNATURADOCENTECORTE C ON (A.IDASIGNATURADOCENTECORTE = C.IDASIGNATURADOCENTECORTE) WHERE A.IDASIGNATURADOCENTECORTE = ?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[idcursoestudiante,idasignaturadocentecorte]);
    return resul
}
async function returnestudiante(estudiante){
    const sql ="SELECT cues.idCurso_Estudiante , us.Documento,us.Apellido,us.Nombre ,no.Calificacion,no.Observacion FROM pgn.curso_estudiante cues inner join pgn.estudiantes es on cues.IdEstudiante=es.idEstudiantes inner join pgn.usuario us on us.Documento = es.Documento left join pgn.notas no on no.IdDocente=? and no.idCurso_Estudiantes = cues.idCurso_Estudiante and no.IdPlanEvaluacion = ? where cues.IdCurso= ?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,estudiante);
    return resul
}
async function returnlaactividadesdependedeidcorteyidasignatura(corteasignatura){
    const sql="SELECT plan.IdPlanEvaluacion,plan.Descripcion from pgn.asignaturadocentecorte adc INNER JOIN pgn.planevaluacion plan on adc.Idasignaturadocentecorte= plan.Idasignaturadocentecorte where adc.IdAsignaturaDocente=? and adc.IdCorte=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,corteasignatura);
    return resul
}

async function createnotas(idNotas){
    const Notas= await getNotas1(idNotas["idCurso_Estudiantes"],idNotas["IdDocente"],idNotas["IdPlanEvaluacion"])
    if(Notas.length==0){
        const sql='INSERT INTO `pgn`.`notas` ( `Observacion`, `Calificacion`,idCurso_Estudiantes,IdDocente,IdPlanEvaluacion) VALUES (?,?,?,?,?)'
        const conection1=await mysql2.createConnection(conection.db);
        const [resul,]=await conection1.execute(sql,Object.values(idNotas));
        if(resul.affectedRows){
            return {codigo:'ok',descricion:'La notas fue creado'}
        }else{
            return {codigo:'error',descricion:'La notas no fue creado exitosamente'}
        }
    }else{
        return await updatenotas(Notas[0]["idNotas"],idNotas["Observacion"],idNotas["Calificacion"])
    }
}
async function deletenotas(idNotas){
    const sql='DELETE FROM `pgn`.`notas` WHERE `idNotas` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idNotas);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La nota fue eliminado'}
    }
    return {codigo:'error',descricion:'La nota no fue eliminado  exitosamente'} 
}
async function updatenotas(idNotas,Observacion,Calificacion){
    const sql='UPDATE `pgn`.`notas` SET `Observacion` =?, Calificacion = ? WHERE idNotas = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Observacion,Calificacion,idNotas]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La nota fue actualizado'}
    }
    return {codigo:'error',descricion:'La nota no fue actualizado  exitosamente'}
}
module.exports={getNota,getNotas,createnotas,deletenotas,updatenotas,returnestudiante,returnlaactividadesdependedeidcorteyidasignatura,returnanota,returnperiodobycarreraestudiante}

