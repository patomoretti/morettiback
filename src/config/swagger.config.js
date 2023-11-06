import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
import { __dirname } from "../utils.js";

const swaggerProducts = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Documentacion api de Productos",
            version:"1.0.0",
            description:"Definicion de endpoints para la API de Productos"
        }
    },
    apis:[`${path.join(__dirname,"/docs/**/*.yaml")}`],
};


export const swaggerSpecs = swaggerJsDoc(swaggerProducts);
