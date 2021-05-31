const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getubicaion(idUbicacion){
    const sql='SELECT * FROM mydb.usuario where idUbicacion=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idUbicacion);
    return resul
}
module.exports={getubicaionu}