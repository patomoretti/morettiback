import {__dirname} from "../../../utils.js";
import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.model.js";

 
export class CartMongo{
    constructor(){
        this.path = cartsModel();
    }

    //veo todos los productos
    async getCart(){   
        try {
            const cart = await cartsModel.find({},{title:1,description:1,price:1,stock:1,code:1,id:1,_id:0});
            // console.log("Productos en el carrito: ", cart);
        } catch (error){
            error.message
        }
    }; 

    //agregando producto al carrito
    async createCart(id){  
        try {
            const prodFind = await productsModel.find(id);
            const prodAdd = await cartsModel.insertMany(prodFind);
            // console.log("Producto agregado al carrito: ", prodAdd);
        } catch (error) {
            error.message
        }
    };

    //buscando un producto en el carrito
    async getProductById(id) {  
        const productExist = await cartsModel.find(id);
        if (!productExist) {
            console.log("Producto no encontrado");
        } else {
            console.log("Product ID: ", productExist);
        };
    };

    //eliminando un producto
    async deleteCartId(id){  
        try { 
            const deleteId = await cartsModel.deleteOne(id);
            if (!deleteId) {
                console.log("Producto no eliminado")
            } else {
                console.log("Producto eliminado: ", deleteId);
            };
        } catch (error) {
            error.message;
        }
    };


};