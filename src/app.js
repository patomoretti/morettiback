import express from "express";
import { connectDB} from "./config/dbConnection.js";
import handlebars from "express-handlebars";
import { productsRouter } from "./routes/products.routes.js";
import {cartRouter} from "./routes/cart.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { Server } from "socket.io";
import { viewsRouter } from "./routes/views.routes.js";
// import { ProductManager } from "./dao/ProductManager.js";


const port = process.env.PORT || 8080;
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

//MONGO
connectDB();

let messages=[];
//Canal de comunicacion
socketServer.on("connection", (socketConnected)=>{
    console.log(`Nuevo cliente conectado ${socketConnected.id}`);

    //Ubicacion del usuario
    socketConnected.on("mensaje", (data)=>{
        console.log(`Ubicacion del usuario: ${data}`);
    })

    // //Products
    // socketConnected.emit("ListaProductos", (ProductList)=>{
    //     console.log("Lista visualizandose en Products", ProductList);
    // });


    //Chat messages
    socketConnected.on("authenticated", (msg)=>{
        socketConnected.emit("messageHistory", messages);
        socketConnected.broadcast.emit("newUser", msg);
    });
    socketConnected.on("message", (data)=>{
        console.log("data", data);
        messages.push(data);
        socketServer.emit("messageHistory", messages);
    });
    
});


//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use(viewsRouter);



