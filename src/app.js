import express from "express";
import {engine} from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "path";
import { Server } from "socket.io";

//rutas
import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { ordersRouter } from "./routes/order.routes.js";
import { businessRouter } from "./routes/business.routes.js";
import { loggerRouter } from "./routes/logger.routes.js";

import { messageModel } from "./dao/mongo/models/messages.model.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import { config } from "./config/config.js";
import { initializePassport } from "./config/passportConfig.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
// import { addLogger } from "./helpers/logger.js";



const port = config.server.port;
const app = express();
// const logger = addLogger();

//guardardando servidor http en una variable
const httpServer = app.listen(port,()=>console.log(`Servidor activo en el puerto ${port}`));
 
//configuracion de sesiones
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo.url
    }),
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized:true
}));

//configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(addLogger);


//configuracion handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));


//servidor websocket
const socketServer = new Server(httpServer);

//Canal de comunicacion
socketServer.on("connection", (socketConnected)=>{
    console.log(`Nuevo cliente conectado ${socketConnected.id}`);

    //Ubicacion del usuario
    socketConnected.on("mensaje", (data)=>{
        console.log(`Ubicacion del usuario: ${data}`);
    })

    //Chat messages
    socketConnected.on("authenticated", (msg)=>{
        socketConnected.emit("messageHistory", messages);
        socketConnected.broadcast.emit("newUser", msg);
    });
    socketConnected.on("message",async (data)=>{
        console.log("data", data);
        const messageCreated = await messageModel.create(data);
        const messages = await messageModel.find();
        socketServer.emit("messageHistory", messages);
    });
    
});


//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions",sessionsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/business", businessRouter);
app.use("/loggerTest", loggerRouter);
app.use(viewsRouter);
app.use(errorHandler);



