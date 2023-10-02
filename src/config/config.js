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
        clientId: "Iv1.e111e5bac9f3579b",
        clientSecret: "81cde2f13665c7902d176cc675a2a3b445e05138",
        callbackUrl: "http://localhost:8080/api/sessions/github-callback"
    }
}