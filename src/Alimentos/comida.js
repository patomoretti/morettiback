

class ProductManager {

    constructor() {
        this.products = [];
    };

    getProducts() {
        return this.products;
    };

    addProduct(title, description, price, thumbnail, code, stock) {

        let newId;
        if (!this.products.length) {
            newId = 1;
        } else {
            newId = this.products[this.products.length - 1].id + 1
        };

        const newProduct = {
            id: newId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        console.log("Nuevo Producto: ", newProduct);

    };

    getProductById(idProduct) {

        const productExist = this.products.some((products) => { products.id === idProduct });
        if (!productExist) {
            console.log("Not found");
        } else {
            const numberProduct = this.products.findIndex((products) => { return products.id === idProduct });
            console.log("Product ID: ", numberProduct);
        };

    }
};

const patoManager = new ProductManager();
const returnProducts = patoManager.getProducts();
patoManager.addProduct("Mijo", "Aca esta la descripcion", 1500, "img", 12, 20);
patoManager.addProduct("Alpiste", "Aca esta la descripcion", 3000, "img", 13, 10);
patoManager.addProduct("Colza", "Aca esta la descripcion", 8000, "img", 14, 13);
console.log("Lista: ", patoManager.getProducts());
console.log("Numero de ID: ", patoManager.getProductById(1));
console.log("ID:" , patoManager.getProductById(4));





