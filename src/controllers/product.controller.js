import { ProductService } from "../services/product.service.js";
import { gmailTransporter } from "../config/gmail.config.js";
// import { logger } from "../helpers/logger.js";

export class ProductController {
    static getProduct = async (req, res)=>{
        const product = await ProductService.getProduct();
        // res.json({ status: "success", data: product, message: "Productos obtenidos" });
    };

    static createProduct = async (req, res)=>{
        const productInfo = req.body;
        if (!productInfo) {
            return res.json({ status: "error", message: "Error al crear el producto" });
        }
        const result = await ProductService.createProduct(req.body);
        res.json({ status: "success", data: result, message: "Producto creado" });
    };

    static getProductById = async (req, res)=>{
        const pId = parseInt(req.params.pid);
        const productFind = await ProductService.getProductById({ id: pId });
        if (!productFind) {
            return res.json({ status: "error", message: "El producto que desea buscar no se ha encontrado" });
            // logger.error("El producto que desea buscar no se ha encontrado");
        } else {
            res.send(productFind);
        };
    };

    static deleteProductId = async (req, res)=>{

        try {
            const deleteId = parseInt(req.params.pid);
            const result = await ProductService.deleteProductId({ id: deleteId });

            if ((req.user.role === "premium" && product.owner.toString() === req.user._id.toString()) || req.user === "admin") {
                const emailTemplate =
                    `<div>
                    <h1>Producto eliminado</h1>
                    <p>El producto ha sido eliminado</p>
                    </div>`
                    ;

                const info = await gmailTransporter.sendMail({
                    from: "Ecommerce Moretti",
                    to: user.email,
                    subject: "Producto eliminado",
                    html: emailTemplate
                });
                await ProductService.deleteProductId(deleteId);
                res.json({status:"success", data:result, message:"Producto eliminado"});
            }else{
                res.json({status:"error", message:"No tienes permiso"});
            }
        } catch (error) {
            res.json({status:"error", message:"Error al eliminar el producto, no tenes acceso"});
        }
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

