const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getcarrera(idCarreraa){
    const sql='SELECT * FROM mydb.Carrera where idCarrera=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idCarrera);
    return resul
}
module.exports={getcarrera}