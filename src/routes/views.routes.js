import {Router} from "express";
import fs from "fs";
import { ProductManager } from "../dao/ProductManager.js";
import { setTimeout } from "timers/promises";

const router = Router();
const jsonFood = new ProductManager('products.json');

//leyendo productos JSON
const productos = fs.readFileSync('./files/products.json', 'utf-8');
const productosParse = JSON.stringify(productos);



router.get("/", (req,res)=>{
    res.render("home");
});


const comida = [productosParse];
router.post("/realtimeproducts",(req,res)=>{
    const food = req.body;
    comida.push(food);
    res.send("Producto Agregado");
});

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts");
});



export {router as viewsRouter};