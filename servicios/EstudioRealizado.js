const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function createEstudiorealizado(EstudioRealizado){
    const sql='INSERT INTO `pgn`.`estudio_realizado` (`Grado_Academico`,`Universidad`,`idDocente`)  VALUES (?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,Object.values(EstudioRealizado));
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudiorealizado fue creado'}
    }
    return {codigo:'error',descricion:'El estudiorealizado no fue creado exitosamente'}
}
async function deleteEstudiorealizado(idEstudio_Realizado){
    const sql='DELETE FROM `pgn`.`estudio_realizado` WHERE `idEstudio_Realizado` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idEstudio_Realizado);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudio realizado fue eliminado'}
    }
    return {codigo:'error',descricion:'El estudio realizado no fue eliminado  exitosamente'}
}
async function updateEstudioRealizado(idEstudio_Realizado,estudiorealizado){
    estudiorealizado=Object.values(estudiorealizado);
    estudiorealizado.push(idEstudio_Realizado);
    const sql='UPDATE `pgn`.`estudio_realizado` SET `Grado_Academico` = ? ,`Universidad` = ? ,`idDocente` = ? WHERE `idEstudio_Realizado` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,estudiorealizado);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudio realizado fue actualizado'}
    }
    return {codigo:'error',descricion:'El estudio realizado  no fue actualizado  exitosamente'}
}
module.exports={createEstudiorealizado,deleteEstudiorealizado,updateEstudioRealizado}