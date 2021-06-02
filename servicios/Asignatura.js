const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getasignatura(idAsignatura){
    const sql='SELECT * FROM mydb.Asignatura where idAsignatura=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idAsignatura);
    return resul
}
async function getasignaturas(){
    const sql='SELECT * FROM mydb.Asignatura'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getasignatura,getasignaturas}