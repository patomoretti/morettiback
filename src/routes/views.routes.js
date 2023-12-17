import {Router} from "express";
import { messageModel } from "../dao/mongo/models/messages.model.js";
import { productsModel } from "../dao/mongo/models/products.model.js";
import { ViewsController } from "../controllers/views.controller.js";

const router = Router();


//localhost:8080  Home
router.get("/",ViewsController.renderHome);

// localhost:8080/signup
router.get("/signup", ViewsController.renderSignup);

// localhost:8080/login
router.get("/login",ViewsController.renderLogin);

// localhost:8080/perfil  //administrando roles
router.get("/perfil",ViewsController.renderProfile);

//localhost:8080/cambio-password
router.get("/cambio-password", (req,res)=>{
    res.render("changePassword");
});

//localhost:8080/forgot-password
router.get("/forgot-password", ViewsController.renderForgot);

//localhost:8080/resetpassword
router.get("/resetpassword", ViewsController.renderResetPass);
 
//localhost:8080/realtimeproducts
const comida = [];
router.post("/realtimeproducts",(req,res)=>{
    const food = req.body;
    comida.push(food);
    res.send(food);
});
router.get("/realtimeproducts", (req,res)=>{
    res.render("realtimeproducts");
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
        // res.json({status:"success", data:products});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//localhost:8080/carts
router.get("api/carts",(req,res)=>{
    res.render("carts");
});



export {router as viewsRouter};