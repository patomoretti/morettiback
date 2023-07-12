import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import {cartRouter} from "./routes/cart.routes.js";


const port = 8080;
const app = express();
app.listen(port,()=>console.log(`Servidor activo ${port}`));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api/products", productsRouter);
app.use("api/carts", cartRouter);
