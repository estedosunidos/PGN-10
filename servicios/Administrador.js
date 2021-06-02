const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
//const { connect } = require('../routes/Administrador');
async function getadministrador(idestudiante){
    const sql='SELECT * FROM mydb.Administrador where idAdministrador=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idestudiante);
    return resul
}
async function getadministradores(){
    const sql='SELECT * FROM mydb.Administrador'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getadministrador,getadministradores}