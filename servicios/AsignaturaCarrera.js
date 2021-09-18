const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function asociarasignaturaencarrera(AsignaturaCarrera){
    console.log(AsignaturaCarrera)
    const sql='INSERT INTO `pgn`.`asignatura_carrera` (`IdAsignatura`,`IdCarrera`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,Object.values(AsignaturaCarrera));
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'se asocio la asignatura en la carrera'}
    }else{
        return {codigo:'error',descricion:'No se pudo asociar la asignatura en la carrera'}
    }
}
//funciona
async function desaciarasignaturaencarrera(idAsignatura_Carrera){
    const sql='DELETE FROM `pgn`.`asignatura_carrera` WHERE `idAsignatura_Carrera` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idAsignatura_Carrera);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El asocio la asignatura en la carrera fue eliminado'}
    }
    return {codigo:'error',descricion:'El asocio la asignatura en la carrera  no fue eliminado  exitosamente'}
}
//funciona
async function uptadeasociarasignaturaencarrera(idDocenteAsignatura,IdAsignatura,IdCarrera){
    console.log(idDocenteAsignatura)
    const sql='UPDATE `pgn`.`asignatura_carrera` SET `IdAsignatura` = ? ,`IdCarrera` = ? WHERE `idAsignatura_Carrera` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[IdAsignatura,IdCarrera,idDocenteAsignatura]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El asocio la asignatura en la carrera fue actualizado'}
    }
    return {codigo:'error',descricion:'El asocio la asignatura en la carrera  no fue actualizado  exitosamente'}
}
    module.exports={asociarasignaturaencarrera,desaciarasignaturaencarrera,uptadeasociarasignaturaencarrera}
