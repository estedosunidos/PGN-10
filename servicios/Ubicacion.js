const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getubicaion(idUbicacion){
    const sql='SELECT * FROM pgn.ubicacion where idUbicacion=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idUbicacion);
    return resul
}
//funciona
async function getubicaiones(){
    const sql='SELECT * FROM pgn.ubicacion'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
//funciona
async function createubicacion(idUbicacion){
    const sql='INSERT INTO `pgn`.`ubicacion` (`Capacidad`, `Direccion`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idUbicacion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La ubicacion fue creado'}
    }
    return {codigo:'error',descricion:'La ubicacion no fue creado exitosamente'}
}
//no funciona
async function deleteubicacion(idUbicacion){
    const sql='DELETE FROM `pgn`.`ubicacion` WHERE `idUbicacion` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idUbicacion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La ubicacion fue eliminado'}
    }
    return {codigo:'error',descricion:'La ubicacion no fue eliminado  exitosamente'} 
}
//funciona
async function updateubicacion(idUbicacion,Capacidad,Direccion){
    const sql='UPDATE `pgn`.`ubicacion` SET `Capacidad` =?, Direccion = ? WHERE idUbicacion = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Capacidad,Direccion,idUbicacion]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La ubicacion fue actualizado'}
    }
    return {codigo:'error',descricion:'La ubicacion  no fue actualizado  exitosamente'}
}
module.exports={getubicaion,getubicaiones,createubicacion,deleteubicacion,updateubicacion}