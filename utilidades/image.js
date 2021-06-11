const multer=require('multer');
const alamcenaimagen =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./image')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const cargaimagen=multer({storage:alamcenaimagen}).single('image');

module.exports={cargaimagen,alamcenaimagen}