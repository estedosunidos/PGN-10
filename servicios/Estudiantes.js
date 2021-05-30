const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getestudiante(idestudiante){
    const sql='SELECT * FROM mydb.perfil where idestudiante=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idestudiante);
    return resul
}
module.exports={getestudiante}
