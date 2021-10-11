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
async function retornaranuncionbygrupo(mensaje){
    const sql="select anun.idAnuncio Id ,date_format(anun.Fecha,'%Y/%m/%d') Fecha,anun.Mensaje from  pgn.anuncio anun  inner join pgn.curso cu on anun.IdCurso=cu.IdCurso where anun.IdCurso=? order by anun.Fecha desc"
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,mensaje);
    return resul
}
async function retornaranunciobyestudiante(anuncioestudiante){
    const sql="SELECT * FROM anuncioporestudiantevw where IdEstudiante=? ORDER BY leido ASC, Fecha DESC"
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,anuncioestudiante);
    return resul

}
async function returanunciobyestudiante(IdEstudiante,IdAnuncio){
    const sql="select * from pgn.anuncio_estudiantes where IdEstudiante=? and IdAnuncio=?"
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[IdEstudiante,IdAnuncio]);
    return resul
}
async function insertaanuncioleido(anuncioleido){
    const sql="Insert INTO pgn.anuncio_estudiantes (IdAnuncio,leido,IdEstudiante) VALUES (?,?,?)"
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,Object.values(anuncioleido))
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El anuncio fue leido'}
    }
    return {codigo:'error',descricion:'El anuncio no fue leido'}

}
async function actualizaranuncioleido(anuncioleido,idAnuncio_Estudiantes){
    const sql="UPDATE pgn.anuncio_estudiantes  SET leido=? where (idAnuncio_Estudiantes=?)"
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[anuncioleido["leido"],idAnuncio_Estudiantes.idAnuncio_Estudiantes]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El anuncio fue actualizado'}
    }
    return {codigo:'error',descricion:'El anuncio no fue actualizado  exitosamente'}
}
async function  createanuncioleido(anuncioleido){
    const anuncioleido1= await returanunciobyestudiante(anuncioleido["IdEstudiante"],anuncioleido["IdAnuncio"])
    if(anuncioleido1.length===0){
        return await insertaanuncioleido(anuncioleido)
    }else{
        return await actualizaranuncioleido(anuncioleido,anuncioleido1[0])
    }
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
module.exports={getanucio,getanucios,createanuncio,deleteanuncio,updateanuncio,retornaranuncionbygrupo,retornaranunciobyestudiante,createanuncioleido}