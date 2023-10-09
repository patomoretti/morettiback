import mongoose from "mongoose";
import { config } from "./config.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/error/customError.service.js";

export const connectDB = async()=>{
    
    try {
        const db = await mongoose.connect(config.mongo.url);
        console.log("Base de datos conectada");
    } catch (error) {
        CustomError.createError({
            name:"Error Database",
            cause:dbErrorMsg(db), 
            message:"Error al conectar a la base de datos",
            errorCode: EError.DATABASE_ERROR
        });
        // console.log(`Hubo un error al conectarse a la base de datos ${error.message}`);
    }
}
 