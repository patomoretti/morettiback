import { cartDao } from "../dao/index.js";

export class CartService { 
    static getCart(){
        return cartDao.getCart();
    };

    static createCart(id){
        return cartDao.createCart(id);
    };

    static getProductById(id){
        return cartDao.getProductById(id);
    };

    static deleteCartId(id){
        return cartDao.deleteCartId(id);
    };
}; 