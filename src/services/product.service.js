import { productDao } from "../dao/index.js";


export class ProductService { 
    static getProduct(){
        return productDao.getProduct();
    };

    static createProduct(productInfo){
        return productDao.createProduct(productInfo);
    };

    static getProductById(id){
        return productDao.getProductById(id);
    };

    static deleteProductId(id){
        return productDao.deleteProductId(id);
    };
};