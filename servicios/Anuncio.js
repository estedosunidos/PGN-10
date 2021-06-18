const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getanucio(idAnuncio){
    const sql='SELECT * FROM pgn.anuncio where idAnuncio=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idAnuncio);
    return resul
}
//funciona
async function getanucios(){
    const sql='SELECT * FROM pgn.anuncio'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
//funciona
async function createanuncio(datomensaje){
    const sql='INSERT INTO `pgn`.`anuncio` (`Mensaje`, `IdCurso`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,datomensaje);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El anuncio fue creado'}
    }
    return {codigo:'error',descricion:'El anuncio no fue creado exitosamente'}
}
//funciona
async function deleteanuncio(idAnuncio){
    const sql='DELETE FROM `pgn`.`anuncio` WHERE `idAnuncio`= ?'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idAnuncio);
    if(resul.affectedRows){
     return {codigo:'ok',descricion:'El anuncio fue eliminado'}
 }
 return {codigo:'error',descricion:'El anuncio  no fue eliminado  exitosamente'}
}
//funciona
async function updateanuncio(idAnuncio,Mensaje){
    const sql='UPDATE `pgn`.`anuncio` SET `Mensaje` = ? WHERE (`idAnuncio` = ?);'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Mensaje,idAnuncio]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El anuncio fue actualizado'}
    }
    return {codigo:'error',descricion:'El anuncio no fue actualizado  exitosamente'}
}
module.exports={getanucio,getanucios,createanuncio,deleteanuncio,updateanuncio}