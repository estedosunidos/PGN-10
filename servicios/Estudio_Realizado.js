const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getEstudio_Realizado(idEstudio_Realizado){
    const sql='SELECT * FROM mydb.Estudio_Realizado where idEstudio_Realizado =?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idEstudio_Realizado);
    return resul
}
module.exports={getEstudio_Realizado}