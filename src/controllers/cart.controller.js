import { CartService } from "../services/cart.service.js";
import {v4 as uuidv4} from 'uuid';

export class CartController{
    
    static getCart(req,res){
        const cart = CartService.getCart();
        let myuuid = uuidv4();
        res.json({status:"success", data:(['ID del Carrito: ' + myuuid,cart]), message:"Estos son todos los productos del carrito"});
    };

    static createCart(req,res){
        const newCart = req.body;
        const result = CartService.createCart(newCart);
        if (!result) {
            res.json({status:"error", message:"Producto no agregado"});
        } else {
            res.json({status:"success", data:result, message:"Producto agregado al carrito"});
        }
    };

    static getProductById(req,res){
        const cId = parseInt(req.params.cid);
        const prodFind =  CartService.getProductById({id:cId});
        if (!prodFind) {
            res.send("El producto que buscas no existe");
        } else {
            res.send(prodFind);
        }
    };

    static deleteCartId(req,res){
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const result = CartService.deleteCartId({id:[cartId,productId]});
        res.json({status:"success", data:result, message:"Producto eliminado"});
    };


};  