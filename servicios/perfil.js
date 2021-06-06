const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getperfil(idperfil){
    const sql='SELECT * FROM pgn.perfil where idperfil=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idperfil);
    return resul
}
async function getperfiles(){
    const sql='SELECT * FROM pgn.perfil'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
async function createperfil(descricion){
    const sql='INSERT INTO `pgn`.`perfil` (`descricion`) VALUES (?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,descricion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El perfil fue creado'}
    }
    return {codigo:'error',descricion:'El perfil no fue creado exitosamente'}
}
async function deleteperfil(idperfil){
    const sql='DELETE FROM `pgn`.`perfil` WHERE `idperfil` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idperfil);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El perfil fue eliminado'}
    }
    return {codigo:'error',descricion:'El perfil no fue eliminado  exitosamente'}
}
async function updatepefil(idperfil,descricion){
    descricion.push(idperfil);
    const sql='UPDATE `pgn`.`perfil` SET `descricion` = ? WHERE `idperfil` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,descricion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El perfil fue actualizado'}
    }
    return {codigo:'error',descricion:'El perfil no fue actualizado  exitosamente'}
}
module.exports={getperfil,getperfiles,createperfil,deleteperfil,updatepefil}
