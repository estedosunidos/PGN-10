const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getestudiante(idestudiante){
    const sql='SELECT * FROM mydb.Estudiantes where idestudiante=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idestudiante);
    return resul
}
async function getestudiantes(){
    const sql='SELECT * FROM mydb.Estudiantes'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getestudiante,getestudiantes}
