import { productDao } from "../dao/index.js";


export class ProductService { 
    static getProduct = async ()=>{
        return productDao.getProduct();
    };

    static createProduct = async (productInfo)=>{
        return productDao.createProduct(productInfo);
    };

    static getProductById = async (id)=>{
        return productDao.getProductById(id);
    };

    static deleteProductId = async (id)=>{
        return productDao.deleteProductId(id);
    };

    static updateProduct = async (id) => {
        return productDao.updateProduct(id)
    }
    
    // static fakerProducts = async ()=>{
    //     return productDao.getFakerProducts();
    // };
};