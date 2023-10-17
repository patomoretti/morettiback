import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const devEnv = process.env.LOGGER_DEV;


export const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"info"}),
        new winston.transports.File({filename:"./logs/errors.log", level:"error"})
    ]
});

export const loggerDev = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"debug"}),
        new winston.transports.File({filename:"./logs/errors.log", level:"error"})
    ]
});

export const loggerProd = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"info"}),
        new winston.transports.File({filename:"./logs/errors.log", level:"error"})
    ]
});


export const addLogger = ()=>{
    let logger;
    if (devEnv === "development") { 
        logger = loggerDev; 
    }else{
        logger = loggerProd;
    }
    return logger;
};
