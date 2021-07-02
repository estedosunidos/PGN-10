const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
//funciona
async function getestudiante(idestudiante){
    const sql='SELECT * FROM pgn.estudiantes where idestudiante=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idestudiante);
    return resul
}
async function getestudiantepordocumento(documento){
    const sql='SELECT * FROM pgn.estudiantes where Documento=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[documento]);
    return resul
}
//funciona
async function getestudiantes(){
    const sql='SELECT * FROM pgn.estudiantes'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function asociarcarrera(carrera,idestudiante){
    const sql='INSERT INTO `pgn`.`carrera_estudiante` (`IdCarrera`,`IdEstudiante`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[carrera,idestudiante]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'se asocio la carrera al estudiante'}
    }else{
        return {codigo:'error',descricion:'No se pudo asociar la carrera al estudiante'}
    }
}
//funciona
async function creteestudiantes(estudiante){
    let estudiantesdocumeto;
    let idestudiante;
    let carrera;
    const sql='INSERT INTO `pgn`.`estudiantes` (`Semestre`,`Documento`) VALUES (?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[estudiante.Semestre,estudiante.Documento]);
    if(resul.affectedRows){
        estudiantesdocumeto =await getestudiantepordocumento(estudiante.Documento);
        if(estudiantesdocumeto.length>0){
            idestudiante=estudiantesdocumeto[0]['idEstudiantes']
            for(const carrera1 of estudiante.Carreras){
                carrera =await  asociarcarrera(carrera1.idCarrera,idestudiante)
                if(carrera.codigo=='error'){
                    return carrera
                }
            };
        }
        return {codigo:'ok',descricion:'El estudiante fue creado'}
    }
    return {codigo:'error',descricion:'El estudiante no fue creado exitosamente'}
}
//funciona
async function deleteestudiantes(idestudiante){
    const sql='DELETE FROM `pgn`.`estudiantes` WHERE `idEstudiantes` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idestudiante);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudiante fue eliminado'}
    }
    return {codigo:'error',descricion:'El estudiante no fue eliminado  exitosamente'}
}
// funciona
async function updateestudiantes(idestudiante,Semestre){
    const sql='UPDATE `pgn`.`estudiantes` SET `Semestre` = ? WHERE `idEstudiantes` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Semestre,idestudiante]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El estudiantes fue actualizado'}
    }
    return {codigo:'error',descricion:'El estudiantes no fue actualizado  exitosamente'}
}
module.exports={getestudiante,getestudiantes,creteestudiantes,deleteestudiantes,updateestudiantes}
