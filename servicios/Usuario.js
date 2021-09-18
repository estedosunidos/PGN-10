const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
const encripto=require('../utilidades/encriptacion');
const insertAdministrativo=require('../servicios/Administrador')
const insertDocente= require('../servicios/Docente')
const insertEstudiantes = require('../servicios/Estudiantes')

//funciona
async function getusuario(Documento){
    const sql='SELECT `Documento`,`Nombre` `Nombres`,`Apellido` `Apellidos`,`Telefono`,`Direccion`,`Fecha_de_nacimiento` `Fecha Nacimiento`, `Email`,`Nombre_de_Usuario`  `Nombre Usuario` , `descricion` `Perfil`  FROM pgn.usuario us inner join pgn.perfil pe on us.idperfil=pe.idperfil where Documento=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,Documento);
    return resul
}
async function getusuariobynombreusuario(nombreusuario){
    const sql='select Documento,Contraseña,Nombre,Apellido,idperfil,Foto from usuario where upper(Nombre_de_Usuario) =upper(?)';
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[nombreusuario]);
    return resul
}
//funciona
async function getusuarios(){
    const sql='SELECT `Documento`,`Nombre` `Nombres`,`Apellido` `Apellidos`,`Telefono`,`Direccion`,`Fecha_de_nacimiento` `Fecha Nacimiento`, `Email`,`Nombre_de_Usuario` `Nombre Usuario` ,`descricion` `Perfil` FROM pgn.usuario us INNER JOIN pgn.perfil pe on pe.idperfil=us.idperfil '
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function asignacionUsuario(nombre,apellido){
    let contador=0
    let existeusuario
    let nombreusuario
    let primernombre=nombre.split(" ")[0]
    let primerapellido=apellido.split(" ")[0]
    nombreusuario=primernombre+"."+primerapellido;
    existeusuario=await existeusuarios(nombreusuario)
    while(existeusuario){
        contador++
        existeusuario=await existeusuarios(nombreusuario+''+contador)
    }
    return contador == 0 ? nombreusuario : nombreusuario+''+contador
}
async  function verificacionperfil(Documento,idperfil){
    let body
    switch(idperfil){
        case '2':
                body={
                Area:null,
                Ocupacion:null,
                Documento:Documento
            }
            await insertAdministrativo.createadministrador(Object.values(body));
        break
        case '3':
             body={
                Semestre:'1',
                Documento:Documento,
                Carreras:[]
            }
            await insertEstudiantes.creteestudiantes(body);

        break;
        case '4':
            body={
                Documento:Documento,
                EstudiosRealizados:[]
            }
            await insertDocente.createdocente(body);
        break;
        default:

    }
}
async function existeusuarios(nombreusuario){
    let existeusuario = await getusuariobynombreusuario(nombreusuario)
    return existeusuario.length > 0
}
//funciona
async function createusuario(datosusuario){
    if('Contraseña' in datosusuario){
       datosusuario['Contraseña']=encripto.encripaes(datosusuario['Contraseña']);
    }
    datosusuario["Nombre_de_Usuario"]=await asignacionUsuario(datosusuario["Nombre"],datosusuario["Apellido"])
    const sql='INSERT INTO `pgn`.`usuario` (`Documento`,`Nombre`,`Apellido`,`Telefono`,`Direccion`,`Fecha_de_nacimiento`, `Email`,`Contraseña`,`idperfil`,`Nombre_de_Usuario`) VALUES (?,?,?,?,?,?,?,?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,Object.values(datosusuario));
    if(resul.affectedRows){
        await verificacionperfil(datosusuario["Documento"],datosusuario["Perfil"])
        return {codigo:'ok',descricion:'El usuario  fue creado'}
    }
    return {codigo:'error',descricion:' El usuario no fue creado exitosamente'}
}
//funciona
async function deleteusuario(Documento){
    const sql='DELETE FROM `pgn`.`usuario` WHERE `Documento` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,Documento);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El usuario  fue eliminado'}
    }
    return {codigo:'error',descricion:'El usuario  no fue eliminado  exitosamente'} 
}
//funciona
async function  updateusuariofoto(documento,foto) {
    const sql='UPDATE `pgn`.`usuario` SET `Foto` =? WHERE  `Documento` = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[foto,documento]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La foto  fue actualizado'}
    }
    return {codigo:'error',descricion:'La foto no fue actualizado  exitosamente'}
}
//funciona
async function updatedatousuario(documento,datosusuario){
    if('Contraseña' in datosusuario){

        datosusuario['Contraseña']=encripto.encripaes(datosusuario['Contraseña']);
     }
    datosusuario=Object.values(datosusuario);
    datosusuario.push(documento);
    const sql='UPDATE `pgn`.`usuario` SET   `Documento`=?,`Nombre`=?,`Apellido`=?, `Telefono` =?, `Direccion` = ?,`Fecha_de_nacimiento`=?,`Email` = ?,`Contraseña` =? WHERE Documento = ?';
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,datosusuario);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'Los dato de usuario fue actualizado'}
    }
    return {codigo:'error',descricion:'Los dato de usuario  no fue actualizado  exitosamente'}
}
module.exports={getusuario,getusuarios,createusuario,deleteusuario,updateusuariofoto,updatedatousuario,getusuariobynombreusuario}

