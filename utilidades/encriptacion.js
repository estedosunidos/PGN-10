const encrito=require('crypto-js');
const encripbase64 = (contrasena)=>{
    return encrito.enc.Base64.stringify(encrito.enc.Utf8.parse(contrasena))
}
const descriptabase64=(cadena)=>{
    return encrito.enc.Base64.parse(cadena).toString(encrito.enc.Utf8)
}
module.exports={encripbase64,descriptabase64}
