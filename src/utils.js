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



export const generateToken = (infoUser)=>{
    const token = jwt.sign(infoUser,secretToken);
    return token;
};

export const validateToken = ()=>{

};