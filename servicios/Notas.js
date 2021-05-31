const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getNotas(idNotas){
    const sql='SELECT * FROM mydb.Notas where idNotas=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idNotas);
    return resul
}
module.exports={getNotas}