import { __dirname } from "../utils.js";
import path from "path";
import fs from "fs";
import { productsModel } from "./models/products.model.js";


export class ProductManager {

    constructor(fileName) {
        this.path = path.join(__dirname, `/files/${fileName}`);
    };

    fileExist(){
        return fs.existsSync(this.path);
    };

    //obteniendo productos
    async getProducts(){
        try {
            if(this.fileExist()){
                // const content = await fs.promises.readFile(this.path, "utf-8");
                // JSON.parse(content);
                const pathProducts = await productsModel.find();
                return pathProducts;
            }else{
                console.log("No es posible obtener los productos");
            }
        } catch (error) {
            throw error;
        }
    };

    //guardando producto
    async save(product){
        try {
            if(this.fileExist()){
                // const content = await fs.promises.readFile(this.path, "utf-8");
                const content = await productsModel.find();
                // const pathProducts = JSON.parse(content);
                let nuevaId = 1;
                if (content.length>0) {
                    nuevaId = content[content.length-1].id+1; 
                }
                const newProduct = {
                    id:nuevaId,
                    ...product
                };
                content.push(newProduct);
                // await fs.promises.writeFile(this.path,JSON.stringify(pathProducts, null, '\t'));
                await productsModel.create();
                return newProduct;
            }else{
                console.log("No es posible esta operacion");
            }
            
        } catch (error) {
            throw error;
        }
    };

    async getProductById(id) {

        // const productExist = this.path.some((products) => { products.id === id});
        const productExist = await productsModel.find({id});
        if (!productExist) {
            console.log("Producto no encontrado");
        } else {
            const numberProduct = this.path.find((products) => { return products.id === id });
            console.log("Product ID: ", numberProduct);
        };

    };

};





