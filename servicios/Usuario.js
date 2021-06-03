const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getusuario(Documento){
    const sql='SELECT * FROM pgn.usuario where Documento=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,Documento);
    return resul
}
async function getusuarios(){
    const sql='SELECT * FROM pgn.usuario'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getusuario,getusuarios}

