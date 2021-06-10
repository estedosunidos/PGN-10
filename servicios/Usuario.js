const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
const encripto=require('../utilidades/encriptacion');
async function getusuario(Documento){
    const sql='SELECT * FROM pgn.usuario where Documento=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,Documento);
    if(resul.length>0){
        resul[0].Contraseña=encripto.descriptabase64(resul[0].Contraseña);

    }
    return resul
}
async function getusuarios(){
    const sql='SELECT * FROM pgn.usuario '
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createusuario(datosusuario){
    if('Contraseña' in datosusuario){
       datosusuario['Contraseña']=encripto.encripaes(datosusuario['Contraseña']);
    }
    const sql='INSERT INTO `pgn`.`usuario` (`Documento`,`Nombre`,`Apellido`,`Telefono`,`Direccion`,`Foto`,`Fecha_de_nacimiento`,`Fecha_Egreso`,`Fecha_ingreso`, `Email`,`Nombre_de_Usuario`,`Contraseña`,`idperfil`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,Object.values(datosusuario));
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El usuario  fue creado'}
    }
    return {codigo:'error',descricion:' El usuario no fue creado exitosamente'}
}
module.exports={getusuario,getusuarios,createusuario}

