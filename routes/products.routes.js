import {Router} from "express";
import require from "fs";
import {ProductManager} from "../../dao/ProductManager.js";


const router = Router();
const productsService = new ProductManager('./products.json');

const validateFields = (req,res,next)=>{
    const productInfo = req.body;
    if (!productInfo.title || !productInfo.description || !productInfo.code || !productInfo.price || !productInfo.status || !productInfo.stock || !productInfo.category) {
        return res.json({status:"error", message:"Datos incompletos"});
    } else {
        next();
    }
};

//leyendo productos JSON
const fs = require;
const productos = fs.readFileSync('../src/products.json', 'utf-8');
const productosParse = JSON.parse(productos);

//http://localhost:8080/api/products
router.get("/", async(req,res)=>{
    res.json({status:"success", data:alimento});
    try {
        const limit = req.query.limit;
        const obtenerProductos = await productsService.getProducts();
        if(limit){

        }else{
            res.json({status:"success", data:obtenerProductos});
        }   
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
    //agrega el producto
    try {
        const productInfo = req.body;
        const productCreate = await productsService.getProducts(productInfo);
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