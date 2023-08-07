import {Router} from "express";
// import fs from "fs";
import {ProductManager} from "../dao/ProductManager.js";
import { productsModel } from "../dao/models/products.model.js";
import { pid } from "process";


const router = Router();
const productService = new ProductManager('products.json');

const validateFields = (req,res,next)=>{
    const productInfo = req.body;
    if (!productInfo.title || !productInfo.description || !productInfo.code || !productInfo.price || !productInfo.stock || !productInfo.category) {
        return res.json({status:"error", message:"Datos incompletos"});
    } else {
        next();
    }
};

//leyendo productos JSON
// const productos = fs.readFileSync('./files/products.json', 'utf-8');
// const productosParse = JSON.parse(productos);


//http://localhost:8080/api/products
router.get("/", async(req,res)=>{
    try {
        const productoo = await productsModel.find();
        res.json({status:"success", data:productoo});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//agregando nuevo producto //localhost:8080/api/products
router.post ("/", async(req,res)=>{
    try {
        const productInfo = req.body;
        const productCreate = await productsModel.create(productInfo);
        res.json({status:"success", data:productCreate, message:"Producto creado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


//localhost:8080/api/products/:pid 
router.get("/:pid", (req,res)=>{
    try {
        const pId = parseInt(req.params.pid);
        const prodFind = productsModel.findOne({id:pId});
        res.json({status:"success", message:prodFind});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
// elm=>elm.id === pId


//modificando producto existente //localhost:8080/api/products/:pid
router.put("/:pid", async (req,res)=>{
    try {
        const pId = parseInt(req.params.pid);
        const productCreate = await productsModel.updateOne({id:pId},{$set:{title,description,price,code,stock,category}});
        res.json({status:"success", data:productCreate, message:`El ID ${id} ha sido modificado`});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//Eliminando un producto //localhost:8080/api/products/:pid
router.delete("/:pid", async (req,res)=>{
    try {
        const pId = parseInt(req.params.pid);
        const deleteId = await productsModel.deleteOne({id:pId});
        res.json({status:"success", message:"El producto ha sido eliminado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});



export {router as productsRouter}