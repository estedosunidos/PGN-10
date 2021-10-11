const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getasistencia(idAsistencia){
    const sql='SELECT * FROM pgn.asistencia where idAsistencia=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idAsistencia);
    return resul 
}
async function getasistencias1(idCurso_Estudiantes,Fecha,IdDocente){
    const sql="SELECT * FROM pgn.asistencia where idCurso_Estudiantes=? and str_to_date(Fecha,'%Y-%m-%d')=str_to_date(?,'%Y-%m-%d') and IdDocente=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[idCurso_Estudiantes,Fecha,IdDocente]);
    return resul
}
//funciona
async function getasistencias(){
        const sql='SELECT * FROM pgn.asistencia'
        const conectin1=await mysql2.createConnection(conection.db);
        const [resul, ]=await conectin1.execute(sql,);
        return resul
}//funciona
async function returnestudiante(estudiante){
    const sql ="SELECT cues.idCurso_Estudiante , us.Documento,us.Apellido,us.Nombre,asi.idAsistencia,nvl(asi.Asistio,'N') Asistio FROM pgn.curso_estudiante cues inner join pgn.estudiantes es on cues.IdEstudiante=es.idEstudiantes inner join pgn.usuario us on us.Documento = es.Documento left join pgn.asistencia asi on  asi.IdDocente=? and asi.Fecha=? and asi.idCurso_Estudiantes = cues.idCurso_Estudiante where cues.IdCurso=?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,estudiante);
    return resul
}
async function createasistencia(idAsistencia){
    const asistencia= await getasistencias1(idAsistencia["idCurso_Estudiantes"],idAsistencia["Fecha"],idAsistencia["IdDocente"])
    if(asistencia.length===0){
        const sql='INSERT INTO `pgn`.`asistencia` ( `Asistio`, `Fecha`,`IdDocente`,`idCurso_Estudiantes`) VALUES (?,?,?,?)'
        const conection1=await mysql2.createConnection(conection.db);
        const [resul,]=await conection1.execute(sql,Object.values(idAsistencia));
        if(resul.affectedRows){
            return {codigo:'ok',descricion:'La asistencia fue creado'}
        }
            return {codigo:'error',descricion:'La asistencia  no fue creado exitosamente'}
    }else{
        return await updateasistencia(asistencia[0]["idAsistencia"],idAsistencia["Asistio"])
    }
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

module.exports={getasistencia,getasistencias,createasistencia,deleteasistencia,updateasistencia,returnestudiante,getasistencias1}