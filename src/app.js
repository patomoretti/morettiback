import express from "express";
import handlebars from "express-handlebars";
import { productsRouter } from "./routes/products.routes.js";
import {cartRouter} from "./routes/cart.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { Server } from "socket.io";
import { viewsRouter } from "./routes/views.routes.js";


const port = 8080;
const app = express();
//guardardando servidor http en una variable
const httpServer = app.listen(port,()=>console.log(`Servidor activo en el puerto ${port}`));

//middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion handlebars
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));



//servidor websocket
const socketServer = new Server(httpServer);

//Canal de comunicacion
socketServer.on("connection", (socketConnected)=>{
    console.log(`Nuevo cliente conectado ${socketConnected.id}`);

    //recibir datos del cliente
    socketConnected.on("mensaje", (data)=>{
        console.log(`Ubicacion del usuario: ${data}`);
    });

    
});


//Rutas
app.use("/api/products", productsRouter);
app.use("api/carts", cartRouter);
app.use(viewsRouter);



