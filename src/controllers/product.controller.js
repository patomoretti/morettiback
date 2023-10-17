import { ProductService } from "../services/product.service.js";
import { logger } from "../helpers/logger.js";

export class ProductController {
    static getProduct(req, res) {
        const product = ProductService.getProduct();
        res.json({ status: "success", data: product, message: "Productos obtenidos" });
    };

    static createProduct(req, res) {
        const productInfo = req.body;
        if (!productInfo) {
            return res.json({ status: "error", message: "Error al crear el producto" });
        }
        const result = ProductService.createProduct(req.body);
        res.json({ status: "success", data: result, message: "Producto creado" });
    };

    static getProductById(req, res) {
        const pId = parseInt(req.params.pid);
        const productFind = ProductService.getProductById({ id: pId });
        if (!productFind) {
            // return res.json({ status: "error", message: "El producto que desea buscar no se ha encontrado" });
            logger.error("El producto que desea buscar no se ha encontrado");
        } else {
            res.send(productFind);
        };
    };

    static deleteProductId(req, res) {
        const deleteId = parseInt(req.params.pid);
        const result = ProductService.deleteProductId({ id: deleteId });
        res.json({ status: "success", data: result, message: "Producto eliminado" });
    };

    static updateProduct = async (req, res) => {
        try {
            const idT = req.body;
            const pId = parseInt(req.params.pid);
            const productModif = await ProductService.updateProduct({id:pId},{$set:{title:idT.title,description:idT.description,price:idT.price,stock:idT.stock,code:idT.code}});
            res.json({status:"success", data:productModif, message:"El producto ha sido modificado"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
    
};

