export class ProductsDto{
    constructor(product){
        this.title = product.title;
        this.id = product.id;
        this.description = product.description;
        this.price = product.price;
        this.code = product.code;
        this.stock = product.stock;
        this.category = product.category;
    };  
};