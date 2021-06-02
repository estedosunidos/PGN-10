const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//const { connect } = require('../routes/Administrador');
async function getanucio(idestudiante){
    const sql='SELECT * FROM mydb.Anuncio where idAnuncio=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idestudiante);
    return resul
}
async function getanucios(){
    const sql='SELECT * FROM mydb.Anuncio'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getanucio,getanucios}