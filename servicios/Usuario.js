const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getusuario(Documento){
    const sql='SELECT * FROM mydb.usuario where Documento=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,Documento);
    return resul
}
module.exports={getusuario}

