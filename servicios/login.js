const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
const encripto=require('../utilidades/encriptacion');
const token=require('../utilidades/autenticacion');
const usuario1=require("../servicios/Usuario")
const perfil=require('../servicios/perfil');
const administrador=require('../servicios/Administrador')
async function autenticacion(nombre_usuario,contrasena){
    let password;
    let perfil1;
    let foto;
    let administrador1;
    let  usuario={token:''};
    let  seccion 
    let usuario2=await usuario1.getusuariobynombreusuario(nombre_usuario)
    if(usuario2.length>0){
        usuario['Documento']=usuario2[0]['Documento'];
        password=usuario2[0]['Contraseña'];
        password=encripto.descripaes(password);
        seccion=await openseccion( usuario['Documento'])
        if((password == contrasena )&& (seccion.codigo==='ok')){
            usuario['token']=token.creaciontoken(nombre_usuario)
       }
        console.log(usuario['token'])
        usuario['Nombre']=usuario2[0]['Nombre'];
        usuario['Apellido']=usuario2[0]['Apellido'];
        perfil1=usuario2[0]['idperfil']
        Perfil2= await perfil.getperfil([perfil1])
        if(Perfil2[0].idperfil==2){
            administrador1=await administrador.getadministradorbydocumento(usuario['Documento'])
            if(administrador1.length>0){
                Perfil2[0]["idAdministrador"] =administrador1[0]["idAdministrador"]
            }
        }
        usuario['Perfil']=Perfil2[0]
        //foto=usuario2[0]['Foto'];
        //usuario['foto']=foto;
    }
    return usuario
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

module.exports={autenticacion,updatedcambiopassword,cierreseccion,openseccion}