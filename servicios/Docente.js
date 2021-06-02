const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getDOCENTE(idDocente){
    const sql='SELECT * FROM mydb.Docente where idDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idDocente);
    return resul
}
async function getdocentes(){
    const sql='SELECT * FROM mydb.Docente'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getDOCENTE,getdocentes}