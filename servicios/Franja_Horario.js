const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getFranja_horario(idFranja_Horario){
    const sql='SELECT * FROM pgn.franja_horario where idFranja_Horario =?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idFranja_Horario);
    return resul
}
async function getFranja_horarios(){
    const sql='SELECT * FROM pgn.franja_horario'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
module.exports={getFranja_horario,getFranja_horarios}