import { cartDao } from "../dao/index.js";

export class CartService { 
    static getCart = async ()=>{
        return cartDao.getCart();
    };

    static createCart = async (cartInfo)=>{
        return cartDao.save(cartInfo);
    };

    static getProductById = async (id)=>{
        return cartDao.getProductById(id);
    };

    static update = async(cartId,cart)=>{
        return await cartDao.update(cartId,cart);
    };

    static deleteCartId = async (id)=>{
        return cartDao.deleteCartId(id);
    };
}; 