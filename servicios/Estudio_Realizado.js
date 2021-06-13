const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getEstudio_Realizado(idEstudio_Realizado){
    const sql='SELECT * FROM pgn.estudio realizado where idEstudio_Realizado =?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idEstudio_Realizado);
    return resul
}
async function getEstudio_Realizados(){
    const sql='SELECT * FROM pgn.estudio realizado'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createEstudio_Realizados(idEstudio_Realizado){
    const sql='INSERT INTO `pgn`.`estudio realizado` (`Grado_Academico`,` Universidad`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idEstudio_Realizado);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudio realizado fue creado'}
    }
    return {codigo:'error',descricion:'El estudio realizado no fue creado exitosamente'}
}
async function deleteEstudio_Realizados(idEstudio_Realizado){
    const sql='DELETE FROM `pgn`.`estudio realizado` WHERE `idEstudio_Realizado` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idEstudio_Realizado);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudio realizado fue eliminado'}
    }
    return {codigo:'error',descricion:'El estudio realizado  no fue eliminado  exitosamente'}
}
async function updateEstudio_Realizados(idEstudio_Realizado,Grado_Academico,Universidad){
    const sql='UPDATE `pgn`.`estudio realizado` SET `Grado_Academico`,` Universidad`` = ? WHERE `idEstudio_Realizado` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Grado_Academico,Universidad,idEstudio_Realizado]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudio realizadol fue actualizado'}
    }
    return {codigo:'error',descricion:'El estudio realizado  no fue actualizado  exitosamente'}
}
module.exports={getEstudio_Realizado,getEstudio_Realizados,createEstudio_Realizados,deleteEstudio_Realizados,updateEstudio_Realizados}