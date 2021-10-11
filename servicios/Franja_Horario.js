const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getFranja_horario(idFranja_Horario){
    const sql='SELECT * FROM pgn.franja_horario where idFranja_Horario =?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idFranja_Horario);
    return resul
}
async function getFranja_horarios(){
    const sql='SELECT * FROM pgn.franja_horario'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function retunFranjasbycurso(Id){
    const sql="select  fah.idFranja_Horario Id,ub.Direccion Ubicacion , date_format(fah.HoraInicio,'%H:%i') `Hora Inicio` , date_format(fah.HoraFinal,'%H:%i') `Hora Fin`,fah.Dia  from pgn.franja_horario fah inner join pgn.ubicacion ub on fah.idUbicacion = ub.idUbicacion  where IdCurso= ?"
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,Id);
    return resul
}
async function createFranja_horarios(idFranja_Horario){
    const sql='INSERT INTO `pgn`.`franja_horario` (`HoraInicio`, `HoraFinal`, `Dia`,`idUbicacion`,`IdCurso`) VALUES (?,?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idFranja_Horario);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La franja horario fue creado'}
    }
    return {codigo:'error',descricion:'La franja horario no fue creado exitosamente'}
}
async function deleteFranja_horarios(idFranja_Horario){
    const sql='DELETE FROM `pgn`.`franja_horario` WHERE `idFranja_Horario` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idFranja_Horario);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La franja horaria fue eliminado'}
    }
    return {codigo:'error',descricion:'La franja horaria no fue eliminado  exitosamente'}
}
async function updateFranja_horarios(idFranja_Horario,HoraInicio,HoraFinal,Dia,idUbicacion,IdCurso){
    console.log(idFranja_Horario,HoraInicio,HoraFinal,Dia,idUbicacion,IdCurso)
    const sql='UPDATE `pgn`.`franja_horario` SET `HoraInicio` =?, HoraFinal = ?, Dia=? ,idUbicacion=?,IdCurso=? WHERE idFranja_Horario = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[HoraInicio,HoraFinal,Dia,idUbicacion,IdCurso,idFranja_Horario]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La franja horaria fue actualizado'}
    }
    return {codigo:'error',descricion:'La franja horaria  no fue actualizado  exitosamente'}
}
module.exports={getFranja_horario,getFranja_horarios,createFranja_horarios,deleteFranja_horarios,updateFranja_horarios,retunFranjasbycurso}