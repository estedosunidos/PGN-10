const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getubicaion(idUbicacion){
    const sql='SELECT * FROM pgn.ubicacion where idUbicacion=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idUbicacion);
    return resul
}
async function getubicaiones(){
    const sql='SELECT * FROM pgn.ubicacion'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
async function createubicacion(idUbicacion){
    const sql='INSERT INTO `pgn`.`ubicacion` (`Capacidad`, `Direccion`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idUbicacion);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La ubicacion fue creado'}
    }
    return {codigo:'error',descricion:'La ubicacion no fue creado exitosamente'}
}
module.exports={getubicaion,getubicaiones,createubicacion}