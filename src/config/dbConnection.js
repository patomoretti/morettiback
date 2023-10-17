import mongoose from "mongoose";
import { config } from "./config.js";
// import { EError } from "../enums/EError.js";
// import { CustomError } from "../services/error/customError.service.js";
// import { dbErrorMsg } from "../services/error/createDBError.service.js";
import { logger } from "../helpers/logger.js";


export const connectDB = async()=>{
    try {
        const db = await mongoose.connect(config.mongo.url);
        logger.info("Base de datos conectada correctamente");
        // console.log("Base de datos conectada");
    } catch (error) {
        logger.error("Problemas al conectar la base de datos");
    }
}
  
// CustomError.createError({ 
//     name:"Error Database",
//     cause:dbErrorMsg(), 
//     message:"Error al conectar a la base de datos",
//     errorCode: EError.DATABASE_ERROR
// });