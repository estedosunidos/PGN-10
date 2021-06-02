const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getperfil(idperfil){
    const sql='SELECT * FROM mydb.perfil where idPerfil=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idperfil);
    return resul
}
async function getperfiles(){
    const sql='SELECT * FROM mydb.perfil'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getperfil,getperfiles}

