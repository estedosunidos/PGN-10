const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getperfil(idperfil){
    const sql='SELECT * FROM mydb.usuario where Documento=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idperfil);
    return resul
}
module.exports={getperfil}

