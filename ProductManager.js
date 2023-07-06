const fs = require("fs");

//visualizando productos JSON
const productos = fs.readFileSync("./products.json", "utf-8");
const productosJson = JSON.parse(productos);
console.log("Productos JSON: ", productosJson);

// const productsList = fs.writeFile("./products.txt", "Aca irian los productos");

export default class ProductManager {

    constructor() {
        this.products = [];
        this.path = productosJson;
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
            title,
            id: newId,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.path.push(newProduct);
        console.log("Nuevo Producto: ", newProduct);

    };

    getProductById(idProduct) {

        const productExist = this.products.some((products) => { products.id === idProduct });
        if (productExist) {
            console.log("Producto no encontrado");
        } else {
            const numberProduct = this.products.findIndex((products) => { return products.id === idProduct });
            console.log("Product ID: ", numberProduct);
        };

    };

    updateProduct(id) {
        const updateId = productosJson.findIndex(productos => productos.id === id);
        if (updateId) {
            const updated = fs.writeFileSync('./products.json', JSON.stringify(productosJson, null, '\t'));
            console.log("Archivo Actualizado", updated);
        } else {
            console.log("Error al actualizar el archivo");
        }
    };

    deleteProduct(id) {
        const eliminar = productosJson.findIndex(productos => productos.id === id);

        if (eliminar === id) {
            const eliminado = fs.unlinkSync(eliminar);
            console.log("Archivo Eliminado", eliminado);
        } else {
            console.log("No existe el archivo que desea eliminar");
        }
    };

};

const patoManager = new ProductManager;
const returnProducts = patoManager.getProducts();

//Agregando nuevo producto
patoManager.addProduct("Prueba 2", "Aca esta la descripcion", 3000, "img", 500, 450);
patoManager.addProduct("Prueba 3", "Descripcion prueba 3", 2000, "img", 300, 100);

//Leer por ID
patoManager.getProductById(12);
patoManager.getProductById(50);

//Actualizando Productos
patoManager.updateProduct("Prueba 3", "Descripcion prueba 3", 2000, "img", 300, 100);

//Eliminar un ID
patoManager.deleteProduct(11);
patoManager.deleteProduct(2);




