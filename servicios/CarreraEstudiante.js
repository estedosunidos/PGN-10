const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function asociarcarrera(carrera){
    console.log(carrera)
    const sql='INSERT INTO `pgn`.`carrera_estudiante` (`IdEstudiante`,`IdCarrera`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,Object.values(carrera));
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'se asocio la carrera al estudiante'}
    }else{
        return {codigo:'error',descricion:'No se pudo asociar la carrera al estudiante'}
    }
}
//funciona
async function desaciarcarrera(CarreraEstudiante){
    const sql='DELETE FROM `pgn`.`carrera_estudiante` WHERE `idCarrera_Estudiante` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,CarreraEstudiante);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El asocio la carrera al estudiante fue eliminado'}
    }
    return {codigo:'error',descricion:'El asocio la carrera al estudiante no fue eliminado  exitosamente'}
}
//funciona
async function uptadeasociarcarrera(idCarrera_Estudiante,IdCarrera,IdEstudiante){
    console.log(idCarrera_Estudiante,IdCarrera,IdEstudiante)
    const sql='UPDATE `pgn`.`carrera_estudiante` SET `IdCarrera` = ? ,`IdEstudiante` = ? WHERE `idCarrera_Estudiante` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[IdCarrera,IdEstudiante,idCarrera_Estudiante]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El asocio la carrera al estudiantefue actualizado'}
    }
    return {codigo:'error',descricion:'El asocio la carrera al estudianteno fue actualizado  exitosamente'}
}
    module.exports={desaciarcarrera,uptadeasociarcarrera,asociarcarrera}
