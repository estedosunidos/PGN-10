const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getcarrera(idCarrera){
    const sql='SELECT * FROM pgn.carrera where idCarrera=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idCarrera);
    return resul
}
//funciona
async function getcarreras(){
    const sql='SELECT * FROM pgn.carrera'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
//funciona
async function creatcarrera(idCarrera){
    const sql='INSERT INTO `pgn`.`carrera` (`Nombre_Carrera`,`CantidadSemestre`,`TotalCredito`) VALUES (?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idCarrera);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La carrera  fue creado'}
    }
    return {codigo:'error',descricion:'La carrera no fue creado exitosamente'}
}
//funciona
async function deletecarrera(idCarrera){
        const sql='DELETE FROM `pgn`.`carrera` WHERE `idCarrera` = ?'
        const conection1=await  mysql2.createConnection(conection.db);
        const [resul,]=await conection1.execute(sql,idCarrera);
        if(resul.affectedRows){
            return {codigo:'ok',descricion:'La carrera fue eliminado'}
        }
        return {codigo:'error',descricion:'La carrera no fue eliminado  exitosamente'}
}
//no funciona
async function updatecarrera(idCarrera,Nombre_Carrera,CantidadSemestre,TotalCredito){
    const sql='UPDATE `pgn`.`carrera` SET `Nombre_Carrera`,`CantidadSemestre`,`TotalCredito` = ? WHERE `idCarrera` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Nombre_Carrera,CantidadSemestre,TotalCredito,idCarrera]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La carrera fue actualizado'}
    }
    return {codigo:'error',descricion:'La carrera  no fue actualizado  exitosamente'}
}
module.exports={getcarrera,getcarreras,creatcarrera,deletecarrera,updatecarrera}