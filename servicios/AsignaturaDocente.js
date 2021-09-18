const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function asociarasignatura(AsignaturaDocente){
    const sql='INSERT INTO `pgn`.`docenteasignatura` (`IdDocente`,`IdAsignatura`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,Object.values(AsignaturaDocente));
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'se asocio la asignatura al docente'}
    }else{
        return {codigo:'error',descricion:'No se pudo asociar la asignatura al docente'}
    }
}
//funciona
async function desaciarasignatura(idDocenteAsignatura){
    const sql='DELETE FROM `pgn`.`docenteasignatura` WHERE `idDocenteAsignatura` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idDocenteAsignatura);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El asocio la asignatura al docente fue eliminado'}
    }
    return {codigo:'error',descricion:'El asocio la asignatura al docente  no fue eliminado  exitosamente'}
}
//funciona
async function uptadeasociarasignatura(idDocenteAsignatura,IdDocente,IdAsignatura){
    console.log(idDocenteAsignatura)
    const sql='UPDATE `pgn`.`docenteasignatura` SET `IdDocente` = ? ,`IdAsignatura` = ? WHERE `idDocenteAsignatura` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[IdDocente,IdAsignatura,idDocenteAsignatura]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El asocio la asignatura al docente fue actualizado'}
    }
    return {codigo:'error',descricion:'El asocio la asignatura al docente  no fue actualizado  exitosamente'}
}
    module.exports={asociarasignatura,desaciarasignatura,uptadeasociarasignatura}
