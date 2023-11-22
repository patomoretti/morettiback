import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const secretToken = process.env.SECRET_TOKEN

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//encriptando la contraseña
export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

//validando la contraseña
export const isValidPassword = (user, password)=>{
    return bcrypt.compareSync(password, user.password);
};

//generando el token
export const generateToken = (infoUser)=>{
    const token = jwt.sign(infoUser,secretToken);
    return token;
};

//validando el token
export const validateToken = ()=>{
    try {
        const info = jwt.verify(token,config.gmail.secretToken);
        return info.email;
    } catch (error) {
        console.log("Error con el token", error.message);
        return null;
    }
};

//filtro para nuestra carga de imagenes de perfil
const multerProfileFilter = (req,file,cb)=>{
    const valid = checkValidFields(req.body);
    if(valid){
        cb(null,true);
    } else{
        cb(null, false);
    }
}

//configuracion para guardar las imagenes de los usuarios
const uploadStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, "/multer/users/img"))
    },
    filename: function(req,file,cb){
        cb(null, `${req.body.email}-profile-${file.originalname}`)
    }
});
export const uploadProfile = multer({storage:uploadStorage, fileFilter:multerProfileFilter});


//configuracion para guardar los documentos de los usuarios
const documentStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, "/multer/users/documents"))
    },
    filename: function(req,file,cb){
        cb(null, `${req.user.email}-documents-${file.originalname}`)
    }
});
export const uploaderDocuments = multer({storage:documentStorage});


//configuracion para guardar las imagenes de los usuarios
const productStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, "/multer/products/img"))
    },
    filename: function(req,file,cb){
        cb(null, `${req.body.code}-product-${file.originalname}`)
    }
});
//creamos uploader de profiles images
export const uploadProduct = multer({storage:productStorage});