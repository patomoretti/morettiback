import {Router} from "express";
// import fs from "fs";
// import {ProductManager} from "../dao/ProductManager.js";
import { productsModel } from "../dao/models/products.model.js";
import { ProductController } from "../controllers/product.controller.js";


const router = Router();
// const productService = new ProductManager('products.json');

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

//localhost:8080/api/products   obteniendo todos los productos
router.get("/", ProductController.getProduct);
//localhost:8080/api/products   agregando nuevo producto 
router.post("/", ProductController.createProduct);
//localhost:8080/api/products/:pid   obteniendo producto por ID
router.get("/:pid", ProductController.getProductById);
//localhost:8080/api/products/:pid    Eliminando un producto 
router.delete("/:pid", ProductController.deleteProductId);






//localhost:8080/api/products   obteniendo todos los productos
// router.get("/", async(req,res)=>{
//     try {
//         const productoo = await productsModel.find({},{_id:1,title:1,id:1,price:1,category:1}).sort({price:1});
//         const productoPaginate = async()=>{
//             let comida = await productsModel.paginate(
//                 {price:{$gt:10}},
//                 {limit:5,page:1}
//             );
//             console.log("Paginacion", comida);
//         };
//         productoPaginate();
//         res.json({status:"success", data:productoo});
//     } catch (error) {
//         res.json({status:"error", message:"Error al obtener los productos"});
//     }
    
// });

//localhost:8080/api/products   agregando nuevo producto 
// router.post ("/", async(req,res)=>{
//     try {
//         const productInfo = req.body;
//         const productCreate = await productsModel.create(productInfo);
//         res.json({status:"success", data:productCreate, message:"Producto creado"});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });


//localhost:8080/api/products/:pid   obteniendo producto por ID
// router.get("/:pid", async (req,res)=>{
//     try {
//         const pId = parseInt(req.params.pid);
//         const prodFind = await productsModel.findOne({id:pId});
//         res.json({status:"success", message:prodFind});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });


//localhost:8080/api/products/:pid   modificando producto existente 
router.put("/:pid", async (req,res)=>{
    try {
        const idT = req.body;
        const pId = parseInt(req.params.pid);
        const productModif = await productsModel.updateOne({id:pId},{$set:{title:idT.title,description:idT.description,price:idT.price,stock:idT.stock,code:idT.code}});
        res.json({status:"success", data:productModif, message:"El producto ha sido modificado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//localhost:8080/api/products/:pid   Eliminando un producto 
// router.delete("/:pid", async (req,res)=>{
//     try {
//         const pId = parseInt(req.params.pid);
//         const deleteId = await productsModel.deleteOne({id:pId});
//         res.json({status:"success", message:"El producto ha sido eliminado"});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });



export {router as productsRouter}