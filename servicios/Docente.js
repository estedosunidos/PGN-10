const mysql2= require('mysql2/promise');
const conection=require('../confi/conection');
const asignaturadocente = require('../servicios/AsignaturaDocente')
//funciona
async function getDOCENTE(idDocente){
    const sql='SELECT do.*,us.Nombre,us.Apellido,us.Nombre_de_Usuario FROM pgn.docente do inner join pgn.usuario us on do.Documento=us.Documento where idDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,idDocente);
    if(resul.length>0){
        resul[0]['EstudiosRealizados']= await returndocente(resul[0]['idDocente']);
        resul[0]['AsignaturaDocente']= await returnasignaturas(resul[0]['idDocente']);
    }
    return resul
}
async function getcortebyasignatura(IdAsignaturaDocente,IdCorte){
    const sql="select * from pgn.asignaturadocentecorte where IdAsignaturaDocente=? and IdCorte=? "
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[IdAsignaturaDocente,IdCorte])
    return resul
}
async function docentedocumento(Documento){
    const sql='SELECT do.*,us.Nombre,us.Apellido,us.Nombre_de_Usuario FROM pgn.docente do inner join pgn.usuario us on do.Documento=us.Documento where do.Documento=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul,]=await conectin1.execute(sql,[Documento]);
    return resul
}
async function docentebydocumento(Documento){
    const docente = await docentedocumento(Documento) 
    let docente1
    if (docente.length>0){
      docente1= await getDOCENTE([docente[0]["idDocente"]])
    }
    return docente1
}
async function getAsignaturaDocenteCortes(){
    const sql='SELECT Idasignaturadocentecorte,IdAsignaturaDocente ,IdCorte,Porcentaje FROM pgn.AsignaturaDocenteCorte'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function createcortebyasignatura(asignaturadocentecorte){
    console.log(asignaturadocentecorte)
    const lista=await getcortebyasignatura(asignaturadocentecorte["IdAsignaturaDocente"],asignaturadocentecorte["IdCorte"])
   console.log(lista)
    if(lista.length ==0){
        const sql="Insert into pgn.asignaturadocentecorte (IdAsignaturaDocente,IdCorte,Pocentaje) values(?,?,?)"
        const conection1=await  mysql2.createConnection(conection.db);
        const [resul,]=await conection1.execute(sql,Object.values(asignaturadocentecorte))
        if(resul.affectedRows){
            return {codigo:'ok',descricion:'El corte por asignatura fueron regitrado exitosamente'}
        }else{
            return {codigo:'error',descricion:'El corte por asignatura no fueron regitrado exitosamente'}
        }
    }else{
        const sql1="Update pgn.AsignaturaDocenteCorte set Pocentaje=? where Idasignaturadocentecorte=?"
        const conectin1=await mysql2.createConnection(conection.db);
        const  [resul, ]=await conectin1.execute(sql1,[asignaturadocentecorte["Pocentaje"],lista[0]["Idasignaturadocentecorte"]])
        if(resul.affectedRows){
            return {codigo:'ok',descricion:'El corte por asignatura fueron actualizado exitosamente'}
        }else{
            return {codigo:'error',descricion:'El corte por asignatura no fueron actualizado exitosamente'}
        }
    }
}
async function getAsignaturaDocenteCorte(IdAsignaturaDocente){

    const sql='SELECT adc.Idasignaturadocentecorte,co.Descripcion FROM pgn.AsignaturaDocenteCorte adc INNER JOIN pgn.corte co on adc.IdCorte=co.IdCorte where IdAsignaturaDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,[IdAsignaturaDocente]);
    return resul
}
async function deleteAsignaturaDocenteCorte(Idasignaturadocentecorte){
    const sql='DELETE FROM `pgn`.`AsignaturaDocenteCorte` WHERE `Idasignaturadocentecorte` = ?'
    console.log(sql)
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Idasignaturadocentecorte]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La asignatura docente corte  fue eliminado'}
    }
    return {codigo:'error',descricion:'La asignatura docente corte  no fue eliminado  exitosamente'}
}
async function UpdateAsignaturaDocenteCorte(Idasignaturadocentecorte,IdAsignaturaDocente,IdCorte,Pocentaje){
    const sql='UPDATE `pgn`.`AsignaturaDocenteCorte` SET `IdAsignaturaDocente` = ? ,IdCorte=? ,Pocentaje=? WHERE `Idasignaturadocentecorte` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[IdAsignaturaDocente,IdCorte,Pocentaje,Idasignaturadocentecorte]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'La asignatura docente corte fue actualizado'}
    }
    return {codigo:'error',descricion:'La asignatura docente corte no fue actualizado  exitosamente'}
}
async function InsertAsignaturaDocenteCorte(IdAsignaturaDocente,IdCorte,Pocentaje){
    console.log(IdAsignaturaDocente,IdCorte,Pocentaje)
    const sql='INSERT INTO pgn.AsignaturaDocenteCorte (IdAsignaturaDocente,IdCorte,Pocentaje) VALUES (?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[IdAsignaturaDocente,IdCorte,Pocentaje]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'se asocio el estudio del docente'}
    }else{
        return {codigo:'error',descricion:'No se pudo asociar el estudio del docente'}
    }
}

//funciona
async function getdocentes(){
    const sql='SELECT do.*, us.Nombre,us.Apellido,us.Nombre_de_Usuario FROM pgn.docente do inner join pgn.usuario us on do.Documento=us.Documento'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,);
    return resul
}
async function getdocentesbyasigantura(IdAsignatura){
    const sql='select doc.idDocente Id, us.Nombre,us.Apellido,us.Documento from pgn.docenteasignatura doasig  inner join  pgn.docente doc  on doasig.IdDocente=doc.idDocente inner join pgn.usuario us on doc.Documento = us.Documento where doasig.idAsignatura=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,IdAsignatura);
    return resul
}
//funciona
async function returndocente(idDocente){
    const sql='SELECT idEstudio_Realizado Id, Grado_Academico "Grado Academico",Universidad FROM  pgn.estudio_realizado er  where er.idDocente=?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,[idDocente]);
    return resul
}
async function returnasignaturas(idDocente){
    const sql='SELECT doasig.idDocenteAsignatura Id, asig.Nombre_Asignatura "Nombre Asignatura" FROM  pgn.asignatura asig inner join pgn.docenteasignatura doasig on doasig.IdAsignatura=asig.IdAsignatura where doasig.IdDocente =?'
    const conectin1=await mysql2.createConnection(conection.db);
    const [resul, ]=await conectin1.execute(sql,[idDocente]);
    return resul
}
async function asociarestudiaorealizado(idDocente,Grado_Academico,universida){
    const sql='insert into pgn.estudio_realizado (idDocente,Grado_Academico,Universidad) value (?,?,?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[idDocente,Grado_Academico,universida]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'se asocio el estudio del docente'}
    }else{
        return {codigo:'error',descricion:'No se pudo asociar el estudio del docente'}
    }
}
//funciona
async function createdocente(Docente){
    let docentepordocuemnto;
    let idDocente;
    let estudios;
    const sql='INSERT INTO `pgn`.`docente` (`Documento`)  VALUES (?)'
    const conection1=await mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Docente.Documento]);
    if(resul.affectedRows){
        docentepordocuemnto=await docentedocumento(Docente.Documento);
        if(docentepordocuemnto.length>0){
            idDocente=docentepordocuemnto[0]['idDocente'];
            for (const estudio of Docente.EstudiosRealizados) {
                estudios =await  asociarestudiaorealizado(idDocente,estudio.Grado_Academico,estudio.Universidad)
                if(estudio.codigo=='error'){
                    return estudio
                }
            }
        }
        return {codigo:'ok',descricion:'El docente  fue creado'}
    }
    return {codigo:'error',descricion:'El docente no fue creado exitosamente'}
}
//funciona
async function deletedocente(idDocente){
    const sql='DELETE FROM `pgn`.`docente` WHERE `idDocente` = ?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,idDocente);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El docente fue eliminado'}
    }
    return {codigo:'error',descricion:'El docente no fue eliminado  exitosamente'}
}
//funciona
async function updatedocente(idDocente,Documento){
    const sql='UPDATE `pgn`.`docente` SET `Documento` = ? WHERE `idDocente` =?'
    const conection1=await  mysql2.createConnection(conection.db);
    const [resul,]=await conection1.execute(sql,[Documento,idDocente]);
    if(resul.affectedRows){
        return {codigo:'ok',descricion:'El docente fue actualizado'}
    }
    return {codigo:'error',descricion:'El docente no fue actualizado  exitosamente'}
}
module.exports={getDOCENTE,getdocentes,createdocente,deletedocente,updatedocente,getdocentesbyasigantura,docentebydocumento,getAsignaturaDocenteCorte,deleteAsignaturaDocenteCorte,UpdateAsignaturaDocenteCorte,InsertAsignaturaDocenteCorte,getAsignaturaDocenteCortes,createcortebyasignatura}