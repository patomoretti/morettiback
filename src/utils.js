import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//encriptando la contraseña
export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

//validando la contraseña
export const isValidPassword = (userDB, password)=>{
    return bcrypt.compareSync(password, userDB.password);
};


const SECRET_TOKEN = "secretCoderToken";

export const generateToken = (infoUser)=>{
    const token = jwt.sign(infoUser,SECRET_TOKEN);
    return token;
};

export const validateToken = ()=>{

};