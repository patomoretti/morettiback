import {Router} from "express";
import { addLogger } from "../helpers/logger.js";

const router = Router();
const logger = addLogger();

router.get("/", (req,res)=>{
    logger.silly("mensaje de nivel silly"); 
    logger.debug("mensaje con nivel debug");
    logger.verbose("mensaje con nivel verbose");
    logger.http("mensaje de nivel http");
    logger.info("mensaje de nivel info");
    logger.warn("mensaje de nivel warn");
    logger.error("mensaje con nivel error");
    res.send("peticion recibida");
})
 

export {router as loggerRouter};