const jwt = require('jwt-simple');
const moment=require('moment');
const configuracion=require('../confi/token');
const creaciontoken =(nombre_usuario)=>{
    const payload={
        sub:nombre_usuario,
        iat:moment().unix(),
        exp:moment().add(1,'days').unix()
    }
    return jwt.encode(payload,configuracion.TOKEN_SECRET)
};
//const validaciontoken;
module.exports={creaciontoken}