const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getcurso(idCurso){
    const sql='SELECT * FROM mydb.Curso where idCurso=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idCurso);
    return resul
}