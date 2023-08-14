import {Router} from "express";
// import {CartManager} from "../dao/CartManager.js";
// import {ProductManager} from "../dao/ProductManager.js";
// import fs from "fs";
import { cartsModel } from "../dao/models/carts.model.js";
import { productsModel } from "../dao/models/products.model.js";

const router = Router();
// const cartService = new CartManager("carrito.json");
// const productService = new ProductManager("products.json");

//leyendo productos JSON
// const productos = fs.readFileSync('./files/products.json', 'utf-8');
// const productosParse = JSON.parse(productos);


// localhost:8080/api/carts
router.post("/", async (req,res)=>{ 
    try {
        const cartCreate = await cartsModel.insertOne({id});
        res.json({status:"success", data:cartCreate});
    } catch (error) {
        res.json({status:"error", message:"No se pudo agregar el producto al carrito"});
    }
});

// localhost:8080/api/carts/:cid
router.get("/:cid", async (req,res)=>{
    const cId = req.params.cid;
    const prodFind = await cartsModel.findById(cId);
    if (!prodFind) {
        res.send("El producto que buscas no existe");
    } else {
        res.send(prodFind);
    }
});

// localhost:8080/api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartsModel.findById(cartId);
        const productoo = await productsModel.findById(productId);
        // const productsCarrito = cart.products;
        // const productooCarrito = productoo.products;
        if (!cart || !productoo) {
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

// localhost:8080/api/carts/api/carts/:cid/products/:pid
router.delete("/api/carts/:cid/products/:pid", (req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

// localhost:8080/api/carts/api/carts/:cid
router.delete("/api/carts/:cid", (req,res)=>{

});

// localhost:8080/api/carts/api/carts/:cid/products/:pid
router.put("/api/carts/:cid/products/:pid", (req,res)=>{

});

// localhost:8080/api/carts/api/carts/:cid
router.put("/api/carts/:cid", (req,res)=>{

});





export {router as cartRouter}