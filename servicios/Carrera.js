const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getcarrera(idCarrera){
    const sql='SELECT * FROM pgn.carrera where idCarrera=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idCarrera);
    return resul
}
async function getcarreras(){
    const sql='SELECT * FROM pgn.carrera'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conection1.execute(sql,);
    return resul
}
async function creatcarrera(idCarrera){
    const sql='INSERT INTO `pgn`.`carrera` (`Nombre_Carrera`,`CantidadSemestre`,`TotalCredito`) VALUES (?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idCarrera);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La carrera  fue creado'}
    }
    return {codigo:'error',descricion:'La carrera no fue creado exitosamente'}
}
module.exports={getcarrera,getcarreras,creatcarrera}