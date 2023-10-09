import {Router} from "express";
// import fs from "fs";
// import { ProductManager } from "../dao/ProductManager.js";
import { checkUserAuthenticated, showLoginView } from "../middlewares/auth.js";
import { messageModel } from "../dao/mongo/models/messages.model.js";
import { productsModel } from "../dao/mongo/models/products.model.js";
import { ViewsController } from "../controllers/views.controller.js";

const router = Router();
// const jsonFood = new ProductManager();

//localhost:8080  Home
router.get("/",ViewsController.renderHome);
// localhost:8080/signup
router.get("/signup", ViewsController.renderSignup);
// localhost:8080/login
router.get("/login",ViewsController.renderLogin);
// localhost:8080/perfil
router.get("/perfil",ViewsController.renderProfile);
//localhost:8080/cambio-password
router.get("/cambio-password", (req,res)=>{
    res.render("changePassword");
});

// router.get("/logout", ViewsController.renderLogout);



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
        const messageSave = await messageModel.insertMany(user,message);
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


//localhost:8080  Home
// router.get("/", async (req,res)=>{
//     res.render("home");
//     const findProduct = await productsModel.find();
// });

//LOGIN, SIGNUP, PROFILE, ETC
//localhost:8080/signup
// router.get("/signup", showLoginView ,(req,res)=>{
//     res.render("signup");
// });

// //localhost:8080/login
// router.get("/login", showLoginView, (req,res)=>{
//     res.render("login");
// });

//localhost:8080/perfil
// router.get("/profile", checkUserAuthenticated ,(req,res)=>{
//     res.render("profile",{user: req.session.userInfo});
//     const infoProfile = req.body;
//     console.log(req.session);
// });



export {router as viewsRouter};