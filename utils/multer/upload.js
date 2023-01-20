const multer = require('multer');
const uuid = require('uuid');


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname+'/uploads');
      },
    filename: (req, file, cb) =>{
        req.fileName=uuid.v4()+'.'+file.originalname.split('.').pop();
        cb(null, req.fileName);
    }
});

const categoryUpload = multer({storage: storage}).single('categoryImage');
const productsUpload = multer({storage: storage}).any('productImages');


module.exports={
    categoryUpload,
    productsUpload
}