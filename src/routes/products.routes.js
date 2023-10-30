import {Router} from "express";
import { ProductController } from "../controllers/product.controller.js";
import {checkAuthenticated, checkRole} from "../middlewares/auth.js"
import { generateUser } from "../utils/helpers.js";


const router = Router();



//localhost:8080/api/products   obteniendo todos los productos
router.get("/", ProductController.getProduct);

//localhost:8080/api/products   agregando nuevo producto
router.post("/", checkAuthenticated, checkRole(["admin","premium"]), ProductController.createProduct);

//localhost:8080/api/products/:pid   obteniendo producto por ID
router.get("/:pid",checkAuthenticated, checkRole(["admin"]),ProductController.getProductById);

//localhost:8080/api/products/:pid    Eliminando un producto
router.delete("/:pid",checkAuthenticated, checkRole(["admin","premium"]), ProductController.deleteProductId);

//localhost:8080/api/products/:pid   modificando producto existente
router.put("/:pid", checkAuthenticated, checkRole(["admin"]), ProductController.updateProduct);




//localhost:8080/api/products/mockingproducts
router.post("/mockingproducts",checkAuthenticated, (req,res)=>{
    const cant = parseInt(req.query.cant) || 100;
        let user = [];
        for (let i = 0; i < cant; i++) {
            const users = generateUser();
            user.push(users);
        }
        res.json({ status: "success", data: user, message: "Productos obtenidos de Faker" });
});





// //localhost:8080/api/products/:pid   modificando producto existente
// router.put("/:pid", async (req,res)=>{
//     try {
//         const idT = req.body;
//         const pId = parseInt(req.params.pid);
//         const productModif = await productsModel.updateOne({id:pId},{$set:{title:idT.title,description:idT.description,price:idT.price,stock:idT.stock,code:idT.code}});
//         res.json({status:"success", data:productModif, message:"El producto ha sido modificado"});
//     } catch (error) {
//         res.json({status:"error", message:error.message});
//     }
// });


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