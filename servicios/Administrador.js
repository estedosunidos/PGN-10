const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//const { connect } = require('../routes/Administrador');
async function getadministrador(idadministrador){
    const sql='SELECT * FROM pgn.administrador where idAdministrador=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idadministrador);
    return resul
}
async function getadministradores(){
    const sql='SELECT * FROM pgn.administrador'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createadministrador(idadministrador){
    const sql='INSERT INTO `pgn`.`administrador` (`Area`, `Ocupacion`, `Documento`) VALUES (?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idadministrador);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El administrador  fue creado'}
    }
    return {codigo:'error',descricion:'El administrador no fue creado exitosamente'}
}

async function deleteadministrador(idadministrador){
    const sql='DELETE FROM `pgn`.`administrador` WHERE `idAdministrador`= ?'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idadministrador);
    if(resul.affectedRows){
     return {codigo:'ok',descricion:'El administrador fue eliminado'}
 }
 return {codigo:'error',descricion:'El administrador  no fue eliminado  exitosamente'}
}
async function updateadministrador(){
    area.push(idadministrador);
    ocupacion.push(idadministrador);
    const sql='UPDATE `pgn`.`administrador` SET `Area` = ?, `Ocupacion` = ? WHERE (`idAdministrador` = ?);'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[area,ocupacion]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El administrador  fue actualizado'}
    }
    return {codigo:'error',descricion:'El administrador no fue actualizado  exitosamente'}
}
module.exports={getadministrador,getadministradores,createadministrador,deleteadministrador,updateadministrador}