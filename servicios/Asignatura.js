const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getasignatura(idAsignatura){
    const sql='SELECT * FROM mydb.Administrador where idAsignatura=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idAsignatura);
    return resul
}
module.exports={getasignatura}