import { ProductService } from "../services/product.service.js";

export class ProductController{
    static getProduct(req,res){
        const product = ProductService.getProduct();
        res.json({status:"success", data:product, message:"Productos obtenidos"});
    };

    static createProduct(req,res){
        const productInfo = req.body;
        if(!productInfo){
            return res.json({status:"success", message:"Error al crear el producto"});
        }
        const result = ProductService.createProduct(req.body);
        res.json({status:"success", data:result, message:"Producto creado"});
    };

    static getProductById(req,res){
        const pId = parseInt(req.params.pid);
        const productFind =  ProductService.getProductById({id:pId});
        if(!productFind){
            return res.json({status:"success", message:"El producto que desea buscar no se ha encontrado"});
        }else {
            res.send(productFind);
        };
    };

    static deleteProductId(req,res){
        const deleteId = parseInt(req.params.pid);
        const result = ProductService.deleteProductId({id:deleteId});
        res.json({status:"success", data:result, message:"Producto eliminado"});
    };
}; 

