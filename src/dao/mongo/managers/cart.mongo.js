import {__dirname} from "../../../utils.js";
import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.model.js";
import { EError } from "../../../enums/EError.js";
import { CustomError } from "../../../services/error/customError.service.js";
import { idCartErrorMsg } from "../../../services/error/createCartError.service.js";

 
export class CartMongo{
    constructor(){
        this.path = cartsModel();
    }

    //guardo carrito 
    async save(cart) {
        try {
            const cartCreated = await cartsModel.create(cart)
            return cartCreated;
        }catch (error) {
            throw error;
        };
    };

    //veo todos los productos
    async getCart(){   
        try {
            const cart = await cartsModel.find({},{id:1});
            console.log("Productos en el carrito: ", cart);
        } catch (error){
            error.message
        }
    }; 
    // title:1,description:1,price:1,stock:1,code:1,id:1,_id:0

    //agregando producto al carrito
    async createCart(id){  
        try {
            const prodFind = await productsModel.find(id);
            const prodAdd = await cartsModel.insertMany(prodFind);
            console.log("Producto agregado al carrito: ", prodAdd);
        } catch (error) {
            error.message
        }
    };

    //buscando un producto en el carrito
    async getProductById(cartId) {  
        try {
            const cart = await cartsModel.findById(cartId)
            if(!cart){
                throw new Error("Hubo un error al obtener el carrito")
            }
            return cart; 
        } catch (error) {
            CustomError.createError({
                name:"Error id cart",
                cause:idCartErrorMsg(cartId), 
                message:"No ha sido posible encontrar el ID",
                errorCode: EError.INVALID_JSON
            });
        }
    };

    //actualizando
    async update(cartId,cart) {
        try {
            const cartUpdated = await cartsModel.findByIdAndUpdate(cartId,cart, {new:true});
            return cartUpdated;
        }catch (error) {
            console.error(error.message);
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