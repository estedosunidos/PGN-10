const mysql2= require('mysql2/promise');
const conection=require('../BASE DE DATO/conection');
async function getasistencia(idAsistencia){
    const sql='SELECT * FROM mydb.Asistencia where idAsistencia=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idAsistencia);
    return resul 
}
    async function getasistencias(){
        const sql='SELECT * FROM mydb.Asistencia'
        const conectin1=await mysql2.createConnection(conection.db);
        const [resul, ]=await conection1.execute(sql,);
        return resul
    }
module.exports={getasistencia,getasistencias}