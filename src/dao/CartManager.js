import {__dirname} from "../utils.js";
// import path from "path";
import fs from "fs";
import { cartsModel } from "./models/carts.model.js";


export class CartManager{
    constructor(fileName){
        // this.path=path.join(__dirname, `/files/${fileName}`);
        this.path = cartsModel.find();
    }

    fileExist(){
        return fs.existsSync(this.path);
    };

    async getAll(){
        try {
            if(this.fileExist()){
                // const content = await fs.promises.readFile(this.path, "utf-8");
                // const carts = JSON.parse(content);
                const carts = await cartsModel.find();
                return carts;
            }else{
                console.log("No es posible obtener los carritos");
            }
        } catch (error) {
            throw error;
        }
    };

    //guardando producto
    async save(){
        try {
            if(this.fileExist()){
                // const content = await fs.promises.readFile(this.path, "utf-8");
                // const carts = JSON.parse(content);
                
                const carts = await cartsModel.insertMany();
                let nuevaId=30;
                if (carts.length>0) {
                    nuevaId = carts[carts.length-1].id+1; 
                }
                const newCart = {
                    id:nuevaId,
                    title,
                    description,
                    price,
                    code,
                    products:[]
                };
                carts.push(newCart);
                // await fs.promises.writeFile(this.path,JSON.stringify(carts, null, '\t'));
                return newCart;
            }else{
                console.log("No es posible esta operacion");
            }
        } catch (error) {
            throw error;
        }
    };


    async getProductById(id) {
        // const productExist = this.path.some((products) => { products.id === id});
        const productExist = await cartsModel.find({id});
        if (!productExist) {
            console.log("Producto no encontrado");
        } else {
            // const numberProduct = this.path.find((products) => { return products.id === id });
            const numberProduct = this.path.findOne({id});
            console.log("Product ID: ", numberProduct);
        };

    };

}