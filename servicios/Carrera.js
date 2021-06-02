const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getcarrera(idCarreraa){
    const sql='SELECT * FROM mydb.Carrera where idCarrera=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idCarrera);
    return resul
}
async function getcarreras(){
    const sql='SELECT * FROM mydb.Carrera'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getcarrera,getcarreras}