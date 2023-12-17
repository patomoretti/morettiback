import {Router} from "express";
import { ProductController } from "../controllers/product.controller.js";
import {checkAuthenticated, checkRole} from "../middlewares/auth.js"
import { generateUser } from "../utils/helpers.js";
import { uploadProduct } from "../utils.js";


const router = Router();



//localhost:8080/api/products   obteniendo todos los productos
router.get("/", ProductController.getProduct);

//localhost:8080/api/products   agregando nuevo producto
router.post("/", checkAuthenticated, checkRole(["admin","premium"]), uploadProduct.single("thumbnail"), ProductController.createProduct);

//localhost:8080/api/products/:pid   obteniendo producto por ID
router.get("/:pid",checkAuthenticated, checkRole(["admin"]),ProductController.getProductById);

//localhost:8080/api/products/:pid    Eliminando un producto
router.delete("/:pid",checkAuthenticated, checkRole(["premium"]), ProductController.deleteProductId);

//localhost:8080/api/products/:pid   modificando producto existente
router.put("/:pid", checkAuthenticated, checkRole(["admin"]), ProductController.updateProduct);




//localhost:8080/api/products/mockingproducts
router.post("/mockingproducts", (req,res)=>{
    const cant = parseInt(req.query.cant) || 100;
        let user = [];
        for (let i = 0; i < cant; i++) {
            const users = generateUser();
            user.push(users);
        }
        res.json({ status: "success", data: user, message: "Productos obtenidos de Faker" });
});



export {router as productsRouter}