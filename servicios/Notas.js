const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getNota(idNotas){
    const sql='SELECT * FROM pgn.notas where idNotas=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idNotas);
    return resul
}
async function getNotas(){
    const sql='SELECT * FROM pgn.notas'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getNota,getNotas}