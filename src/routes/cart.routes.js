import {Router} from "express";
import {CartManager} from "../dao/CartManager.js";
import {ProductManager} from "../dao/ProductManager.js";
import fs from "fs";
import { cartsModel } from "../dao/models/carts.model.js";

const router = Router();
const cartService = new CartManager("carrito.json");
const productService = new ProductManager("products.json");

//leyendo productos JSON
// const productos = fs.readFileSync('./files/products.json', 'utf-8');
// const productosParse = JSON.parse(productos);

router.post("/", async (req,res)=>{ 
    try {
        const cartCreate = await cartService.save();
        res.json({status:"success", data:cartCreate});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


router.get("/:cid", (req,res)=>{
    const cId = parseInt(req.params.cid);
    const prodFind = productosParse.find(elm=>elm.id === cId);
    if (!prodFind) {
        res.send("El producto no existe");
    } else {
        res.send(prodFind);
    }
});


router.post("/:cid/product/p:id", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartService.getProductById(cartId);
        const productoo = await productService.getProductById(productId);
        const productsCarrito = cart.products;
        const productooCarrito = productoo.products;
        if (!productsCarrito || !productooCarrito) {
            res.json({status:"error", message:error.message});
        } else {
            const idProduct = this.path.find((products) => { return products.id === id });
            res.json({status:"success", data:idProduct});
        }
        res.json({status:"success", data:cartCreate});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


export {router as cartRouter}