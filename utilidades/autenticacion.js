const jwt = require('jwt-simple');
const moment=require('moment');
const configuracion=require('../confi/token');
const creaciontoken =(nombre_usuario)=>{
    const payload={
        sub:nombre_usuario,
        iat:moment().unix(),
        exp:moment().add(3,'days').unix()
    }
    return jwt.encode(payload,configuracion.TOKEN_SECRET)
};
const validaciontoken=(autorizacion)=>{
    let retorno={
        codigo:0,
        mensaje:''
    }
    if(!autorizacion){
        retorno.codigo=403;
        retorno.mensaje='la peticion no tiene la cabeza de la autorizacion';
        return retorno
    }
    const  token=autorizacion.split(' ')[1];
    const payload=jwt.decode(token,configuracion.TOKEN_SECRET);
    if(payload.exp<=moment().unix()){
        retorno.codigo=401;
        retorno.mensaje='el token es incorrecto';
        return retorno 
    }
    return retorno
};
module.exports={creaciontoken,validaciontoken}