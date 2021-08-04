const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getDOCENTE(idDocente){
    const sql='SELECT * FROM pgn.docente where idDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idDocente);
    if(resul.length>0){
        console.log(await returndocente(resul[0]['idDocente']))
        resul[0]['EstudiosRealizados']= await returndocente(resul[0]['idDocente']);
    }
    return resul
}
async function docentedocumento(Documento){
    const sql='SELECT * FROM pgn.docente where Documento=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[Documento]);
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
    const sql='SELECT * FROM  pgn.estudio_realizado er  where er.idDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,[idDocente]);
    return resul
}
async function asociarestudiaorealizado(idDocente,Grado_Academico,universida){
    const sql='insert into pgn.estudio_realizado (idDocente,Grado_Academico,Universidad) value (?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[idDocente,Grado_Academico,universida]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'se asocio el estudio del docente'}
    }else{
        return {codigo:'error',descricion:'No se pudo asociar el estudio del docente'}
    }
}
//funciona
async function createdocente(Docente){
    let docentepordocuemnto;
    let idDocente;
    let estudios;
    const sql='INSERT INTO `pgn`.`docente` (`Documento`)  VALUES (?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Docente.Documento]);
    if(resul.affectedRows){
        docentepordocuemnto=await docentedocumento(Docente.Documento);
        if(docentepordocuemnto.length>0){
            idDocente=docentepordocuemnto[0]['idDocente'];
            for (const estudio of Docente.EstudiosRealizados) {
                estudios =await  asociarestudiaorealizado(idDocente,estudio.Grado_Academico,estudio.Universidad)
                if(estudio.codigo=='error'){
                    return estudio
                }
            }
        }
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