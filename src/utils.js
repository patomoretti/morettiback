import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";



export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//encriptando la contraseña
export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

//validando la contraseña
export const isValidPassword = (userDB, password)=>{
    return bcrypt.compareSync(password, userDB.password);
};