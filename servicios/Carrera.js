const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getcarrera(idCarrera){
    const sql='SELECT * FROM pgn.carrera where idCarrera=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idCarrera);
    if(resul.length>0){
        resul[0]['AsignaturaCarrera']= await returnasignaturas(resul[0]['idCarrera']);
    }
    return resul
}
//funciona
async function getcarreras(){
    const sql='SELECT `idCarrera` Id,`Nombre_Carrera` Carrera  ,`CantidadSemestre` Semestres,`TotalCredito` `Total Creditos` FROM pgn.carrera'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function getcarrerabyestudiante(IdCarrera){
    const sql='SELECT * FROM pgn.carrera ca inner join pgn.carrera_estudiante caest on ca.idCarrera=caest.IdCarrera where idCarrera_Estudiante=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,IdCarrera);
    if(resul.length>0){
        resul[0]['AsignaturaCarrera']= await returnasignaturas(resul[0]['idCarrera']);
    }
    return resul

}
//funciona
async function creatcarrera(idCarrera){
    const sql='INSERT INTO `pgn`.`carrera` (`Nombre_Carrera`,`CantidadSemestre`,`TotalCredito`,`idAdministrador`) VALUES (?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idCarrera);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La carrera  fue creado'}
    }
    return {codigo:'error',descricion:'La carrera no fue creado exitosamente'}
}
async function returnasignaturas(idCarrera){
    const sql='SELECT ac.idAsignatura_Carrera Id, asig.Nombre_Asignatura "Nombre Asignatura" FROM  pgn.asignatura_carrera ac inner join pgn.asignatura asig on ac.idAsignatura=asig.idAsignatura where ac.IdCarrera =?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,[idCarrera]);
    return resul
}
//funciona
async function deletecarrera(idCarrera){
        const sql='DELETE FROM `pgn`.`carrera` WHERE `idCarrera` = ?'
        const conection1=await  mysql2.createConnection(conection.db);
        const [resul,]=await conection1.execute(sql,idCarrera);
        if(resul.affectedRows){
            return {codigo:'ok',descricion:'La carrera fue eliminado exitosamente'}
        }
        return {codigo:'error',descricion:'La carrera no fue eliminado  exitosamente'}
}
// funciona
async function updatecarrera(idCarrera,Nombre_Carrera,CantidadSemestre,TotalCredito){
    const sql='UPDATE `pgn`.`carrera` SET `Nombre_Carrera`=?,`CantidadSemestre`=?,`TotalCredito` = ?,`FechaActualizacion`=current_TIMESTAMP() WHERE `idCarrera` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Nombre_Carrera,CantidadSemestre,TotalCredito,idCarrera]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La carrera fue actualizado'}
    }
    return {codigo:'error',descricion:'La carrera  no fue actualizado  exitosamente'}
}
module.exports={getcarrera,getcarreras,creatcarrera,deletecarrera,updatecarrera,returnasignaturas,getcarrerabyestudiante}