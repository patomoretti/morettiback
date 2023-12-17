import dotenv from "dotenv";
dotenv.config();
// console.log(process.env); //veo todas las variables

export const config = {
    server:{
        port: process.env.PORT,
        secretSession: process.env.SECRET_TOKEN,
        persistence: process.env.PERSISTENCE
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    gitHub:{
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackUrl: process.env.CALLBACK_URL
    },
    gmail:{
        account: process.env.GMAIL_SALES,
        password: process.env.GMAIL_SALES_PASSWORD,
        secretToken: process.env.SECRET_TOKEN_EMAIL
    } 
} 