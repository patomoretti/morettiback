import {Router} from "express";
import fs from "fs";
import {ProductManager} from "../dao/ProductManager.js";


const router = Router();
const productService = new ProductManager('products.json');

const validateFields = (req,res,next)=>{
    const productInfo = req.body;
    if (!productInfo.title || !productInfo.description || !productInfo.thumbnail || !productInfo.code || !productInfo.price || !productInfo.status || !productInfo.stock || !productInfo.category) {
        return res.json({status:"error", message:"Datos incompletos"});
    } else {
        next();
    }
};

//leyendo productos JSON
const productos = fs.readFileSync('./files/products.json', 'utf-8');
const productosParse = JSON.parse(productos);


//http://localhost:8080/api/products
router.get("/", async(req,res)=>{
    try {
        const productoo = await productService.getProducts();
        res.json({status:"success", data:productoo});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//http://localhost:8080/api/products/id  encuentra los que estan en el JSON
router.get("/:pid", (req,res)=>{
    const pId = parseInt(req.params.pid);
    const prodFind = productosParse.find(elm=>elm.id === pId);
    if (!prodFind) {
        res.send("El producto no existe");
    } else {
        res.send(prodFind);
    }
});


//agregando nuevo producto
router.post ("/", validateFields, async(req,res)=>{
    //otra manera de agregarlo sin el PRODUCT MANAGER
    // const productInfo = req.body;
    // alimento.push(productInfo);
    // res.json({status:"success", message:"Producto agregado"});
    try {
        const productInfo = req.body;
        const productCreate = await productService.save(productInfo);
        res.json({status:"success", data:productCreate, message:"Producto creado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//modificando producto existente
router.put("/:pid", validateFields, (req,res)=>{
    const productInfo = req.body;
    //actualizar el producto
});


router.delete("/:pid", (req,res)=>{});



export {router as productsRouter}