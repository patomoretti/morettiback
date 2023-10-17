import { __dirname } from "../../../utils.js";
// import path from "path";
// import fs from "fs";
import { productsModel } from "../models/products.model.js";

export class ProductMongo {

    constructor() {
        // this.path = path.join(__dirname, `/files/${fileName}`);
        this.path = productsModel();
    };

    //obteniendo productos
    async getProduct() {
        try {
            const productoo = await productsModel.find({}, { _id: 1, title: 1, id: 1, price: 1, category: 1 }).sort({ price: 1 });
            const productoPaginate = async () => {
                let comida = await productsModel.paginate(
                    { price: { $gt: 10 } },
                    { limit: 5, page: 1 }
                );
                console.log("Paginacion", comida);
            };
            productoPaginate();
            return productoo;
        } catch (error) {
            error.message
        }
    };

    //creando producto
    async createProduct(productInfo) {
        try {
            const productCreate = await productsModel.insertMany(productInfo);
            res.json({ status: "success", data: productCreate, message: "Producto creado" });
        } catch (error) {
            error.message
        }
    };

    //obteniendo producto por id 
    async getProductById(id) {
        const prodFind = await productsModel.find(id);
        if (!prodFind) {
            console.log("Producto no encontrado");
        } else {
            console.log("Product encontrado: ", prodFind);
        };
    };

    //actualizando producto
    async updateProduct(id) {
        try {
            const updateProduct = await productsModel.updateOne(id);
            res.json({ status: "success", data: updateProduct, message: "Producto actualizado" });
        }
        catch (error) {
            console.log("Hubo un error al actualizar el producto");
        }
    };


    //eliminando producto por id
    async deleteProductId(id) {
        try {
            const deleteId = await productsModel.deleteOne(id);
            if (!deleteId) {
                console.log("Producto no eliminado")
            } else {
                console.log("Producto eliminado: ", deleteId);
            }
        } catch (error) {
            error.message
        }
    };


    // //obteniendo productos de Faker
    // async getFakerProducts() {
    //     const cant = parseInt(req.query.cant) || 100;
    //     const products = generateProduct();
    //     res.json({ status: "success", data: products });
    // };
};





