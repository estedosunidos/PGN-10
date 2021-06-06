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
async function createEstudio_Realizados(){

}
async function deleteEstudio_Realizados(){

}
async function updateEstudio_Realizados(){

}
module.exports={getEstudio_Realizado,getEstudio_Realizados,createEstudio_Realizados,deleteEstudio_Realizados,updateEstudio_Realizados}