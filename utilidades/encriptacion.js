const encrito=require('crypto-js');
const encripbase64 = (contrasena)=>{
    return encrito.enc.Base64.stringify(encrito.enc.Utf8.parse(contrasena))
}
const descriptabase64=(cadena)=>{
    return encrito.enc.Base64.parse(cadena).toString(encrito.enc.Utf8)
}
const encripaes=(contrasena)=>{
    const frase='passworld';
    return encrito.AES.encrypt(contrasena,frase).toString()
}
const descripaes=(contrasena)=>{
    const frase='passworld';
    const byte=encrito.AES.decrypt(contrasena,frase);
    return byte.toString(encrito.enc.Utf8)

}
module.exports={encripbase64,descriptabase64,encripaes,descripaes}
