const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getDOCENTE(idDocente){
    const sql='SELECT * FROM pgn.docente where idDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idDocente);
    if(resul.length>0){
        resul[0]['Grado_Academico']= await returndocente(resul[0]['idDocente']);
        resul[0]['Universidad']= await returndocente(resul[0]['idDocente']);
    }
    return resul
}
//funciona
async function getdocentes(){
    const sql='SELECT * FROM pgn.docente'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
//funciona
async function returndocente(idDocente){
    const sql='SELECT do.* FROM pgn.estudio realizado es join pgn.docente do on es.idDocente=do.idDocente where do.idDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,[idDocente]);
    return resul
}
//funciona
async function createdocente(idDocente){
    const sql='INSERT INTO `pgn`.`docente` (`Documento`)  VALUES (?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idDocente);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El docente  fue creado'}
    }
    return {codigo:'error',descricion:'El docente no fue creado exitosamente'}
}
//funciona
async function deletedocente(idDocente){
    const sql='DELETE FROM `pgn`.`docente` WHERE `idDocente` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idDocente);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El docente fue eliminado'}
    }
    return {codigo:'error',descricion:'El docente no fue eliminado  exitosamente'}
}
//funciona
async function updatedocente(idDocente,Documento){
    const sql='UPDATE `pgn`.`docente` SET `Documento` = ? WHERE `idDocente` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Documento,idDocente]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El docente fue actualizado'}
    }
    return {codigo:'error',descricion:'El docente no fue actualizado  exitosamente'}
}
module.exports={getDOCENTE,getdocentes,createdocente,deletedocente,updatedocente}