const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
const encripto=require('../utilidades/encriptacion');
const token=require('../utilidades/autenticacion');
function autenticacion(nombe_usuario,contrasena){
    return token.creaciontoken(nombe_usuario)
}
//funciona
async function updatedcambiopassword(contrasena,documento){
    if('Contraseña' in contrasena){
        contrasena['Contraseña']=encripto.encripaes(contrasena['Contraseña']);
     }
     contrasena=Object.values(contrasena);
     contrasena.push(documento);
    const sql='UPDATE `pgn`.`usuario` SET `Contraseña` =? WHERE Documento = ?';
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,contrasena);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La contraseña  fue actualizada'}
    }
    return {codigo:'error',descricion:' La contraseña no fue actualizado exitosamente'}
}
//funciona
async function cierreseccion(Documento){
    const sql='UPDATE pgn.usuario SET Fecha_Egreso=current_date() where Documento=?';
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Documento]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El usuario se salio del sistema'}
    }
    return {codigo:'error',descricion:' EL usuario intendo salir del sistema'}
}
//funciona
async function openseccion(Documento){
    const sql='UPDATE pgn.usuario SET Fecha_ingreso=current_date() where Documento=?';
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Documento]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El usuario entro del sistema'}
    }
    return {codigo:'error',descricion:' EL usuario intendo entra al sistema'}
}
async function login(nombre_usuario,contrasena){
    //await openseccion(Documento);
}
module.exports={autenticacion,updatedcambiopassword,cierreseccion,openseccion,login}