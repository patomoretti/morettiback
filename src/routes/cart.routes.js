import {Router} from "express";
import { cartsModel } from "../dao/mongo/models/carts.model.js";
import { productsModel } from "../dao/mongo/models/products.model.js";
// import {v4 as uuidv4} from 'uuid';
import { CartController } from "../controllers/cart.controller.js";
import { TicketsController } from "../controllers/ticket.controller.js";

const router = Router();



// localhost:8080/api/carts/carts/:cid  Veo todos los productos agregados al carrito
router.get("/carts/:cid", CartController.getCart);

// localhost:8080/api/carts   Agrego producto al carrito
router.post("/", CartController.createCart);

// localhost:8080/api/carts/:cid   Veo id del carrito 
router.get("/:cid", CartController.getProductById);

// localhost:8080/api/carts/api/carts/:cid/products/:pid  Elimina el producto seleccionado
router.delete("/api/carts/:cid/products/:pid", CartController.deleteCartId);

// localhost:8080/api/carts  finalizar proceso de compra con un ticket
router.post("/:cid/purchase", TicketsController.createTicket);
 


// localhost:8080/api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const cart = await cartsModel.findOne(cartId);
        const producto = await productsModel.findOne(productId);
        if (!cart || !producto) {
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



// localhost:8080/api/carts/api/carts/:cid  Elimina todos los productos del carrito
router.delete("/api/carts/:cid", async (req,res)=>{
    try {   
        const cartId = parseInt(req.params.cid);
        const prodDelete = await cartsModel.deleteMany({id:{$exists:true}});
        res.json({status:"success", data: prodDelete, message:"Todos los productos fueron eliminados"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


// localhost:8080/api/carts/api/carts/:cid/products/:pid   
router.put("/api/carts/:cid/products/:pid", async (req,res)=>{
    try {
        const idT = req.body;
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const prodModif = await cartsModel.updateOne({id:[cartId,productId]},{$set:{title:idT.title,description:idT.description,price:idT.price,stock:idT.stock,code:idT.code}});
        res.json({status:"success", data:prodModif, message:"Varios productos han sido modificados"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

// localhost:8080/api/carts/api/carts/:cid   Modifico un producto del carrito
router.put("/api/carts/:cid", async (req,res)=>{
    try {
        const idT = req.body;
        const cartId = parseInt(req.params.cid);
        const prodModif = await cartsModel.updateOne({id:cartId},{$set:{title:idT.title,description:idT.description,price:idT.price,stock:idT.stock,code:idT.code}});
        res.json({status:"success", data:prodModif, message:"Product Cart ha sido Actualizado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});



// localhost:8080/api/carts/api/carts/:cid/products/:pid  Elimina el producto seleccionado
// router.delete("/api/carts/:cid/products/:pid", async (req,res)=>{
//     try { 
//         const cartId = parseInt(req.params.cid);
//         const productId = parseInt(req.params.pid);
//         await cartsModel.deleteOne({id:[cartId,productId]});
//         res.json({status:"success", message:"Producto Eliminado"});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });

// localhost:8080/api/carts   Agrego producto al carrito
// router.post("/", async (req,res)=>{
//     try {
//         const id = parseInt(req.body.id);
//         const prodFind = await productsModel.find(id);
//         const cartCreate = await cartsModel.insertMany(prodFind);
//         res.json({status:"success", data:cartCreate, message:"Producto Agregado"});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });

// localhost:8080/api/carts/:cid   Veo id del carrito
// router.get("/:cid", async (req,res)=>{
//     const cId = parseInt(req.params.cid);
//     const prodFind = await cartsModel.findOne({id:cId});
//     if (!prodFind) {
//         res.send("El producto que buscas no existe");
//     } else {
//         res.send(prodFind);
//     }
// });

// localhost:8080/api/carts/carts/:cid  Veo todos los productos agregados al carrito
// router.get("/carts/:cid", async (req,res)=>{
//     try {
//         // const idP = req.body;
//         const cart = await cartsModel.find({},{title:1,description:1,price:1,stock:1,code:1,id:1,_id:0});
//         let myuuid = uuidv4();
//         res.json({status:"success", data:(['ID del Carrito: ' + myuuid,cart]), message:"Estos son todos los productos del carrito"});
//     } catch (error){
//         res.json({status:"error", message:error.message});
//     }

// });




export {router as cartRouter}