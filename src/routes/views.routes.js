import {Router} from "express";
// import fs from "fs";
// import { ProductManager } from "../dao/ProductManager.js";
import { messageModel } from "../dao/models/messages.model.js";
import { productsModel } from "../dao/models/products.model.js";

const router = Router();
// const jsonFood = new ProductManager();


//localhost:8080  Home
router.get("/", async (req,res)=>{
    res.render("home");
    const findProduct = await productsModel.find();
});

//localhost:8080/realtimeproducts
const comida = [];
router.post("/realtimeproducts",(req,res)=>{
    const food = req.body;
    comida.push(food);
    res.send(food);
});
router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts");
});


//localhost:8080/chatMessages
router.get("/chatMessages",(req,res)=>{
    res.render("chat");
});
router.post("/chatMessages", async (req,res)=>{
    try {
        const messageSave = await messageModel.insertMany({user,message});
        res.json({status:"success", data:messageSave, message:"Chat subido a Mongo"});
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"Hubo un error al guardar el mensaje en Mongo"});
    }
});


//localhost:8080/products
router.get("/products", async (req,res)=>{
    try {
        const products = await productsModel.find();
        res.json({status:"success", data:products});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//Carrito
router.get("/carts",(req,res)=>{
    res.render("carts");
});

//LOGIN, SIGNUP, PROFILE, ETC
//localhost:8080/signup
router.get("/signup",(req,res)=>{
    res.render("signup");
});
//localhost:8080/login
router.get("/login",(req,res)=>{
    res.render("login");
});
//localhost:8080/perfil
router.get("/profile",(req,res)=>{
    res.render("profile");
    const infoProfile = req.body;
    
});

export {router as viewsRouter};