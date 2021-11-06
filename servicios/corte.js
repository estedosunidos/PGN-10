const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
async function getcortes(){
    const sql='SELECT IdCorte Id,Descripcion  FROM pgn.corte'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,);
    return resul
}
async function getcorte(IdCorte){
    const sql='SELECT IdCorte Id,Descripcion  FROM pgn.corte WHERE IdCorte=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[IdCorte]);
    return resul
}
async function returncortebyasignatura(IdAsignaturadocentecorte){
    const sql='SELECT co.IdCorte Id,co.Descripcion Corte,nvl(adc.Pocentaje,0) Porcentaje from pgn.corte co left join pgn.asignaturadocentecorte adc on co.IdCorte=adc.IdCorte and adc.IdAsignaturaDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[IdAsignaturadocentecorte])
    return resul
}
async function createcorte(corte){
    const sql='insert into pgn.corte (Descripcion) values (?)'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,Object.values(corte));
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El corte fue creado'}
    }
    return {codigo:'error',descricion:'El corte no fue creado exitosamente'}
}
async function deletecorte(IdCorte){
        const sql='DELETE FROM `pgn`.`corte` WHERE `IdCorte` = ?'
        const conection1=await  mysql2.createConnection(conection.db);
        const [resul,]=await conection1.execute(sql,[IdCorte]);
        if(resul.affectedRows){
            return {codigo:'ok',descricion:'El corte fue eliminado exitosamente'}
        }
        return {codigo:'error',descricion:'El corte no fue eliminado  exitosamente'}
}
async function updatecorte(IdCorte,Descripcion){
    const sql='update pgn.corte set Descripcion=? where Idcorte=?'
    const conection1=await  mysql2.createConnection(conection.db);
        const [resul,]=await conection1.execute(sql,[Descripcion,IdCorte]);
        if(resul.affectedRows){
            return {codigo:'ok',descricion:'EL corte fue  actualizado exitosamente'}
        }
        return {codigo:'error',descricion:'El corte no fue actualizado exitosamente'}

}
module.exports ={updatecorte,deletecorte,createcorte,getcorte,getcortes,returncortebyasignatura}