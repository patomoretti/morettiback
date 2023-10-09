import { CartService } from "../services/cart.service.js";
import { ProductService } from "../services/product.service.js";
import { v4 as uuidv4 } from 'uuid';


export class CartController {

    static getCart = async (req, res) => {
        try {
            const cart = await CartService.getCart(); 
            let myuuid = uuidv4();
            res.json({ status: "success", data:cart, message: (['ID del Carrito: ' + myuuid])});
        } catch (error) {
            console.log(error.menssage)
            res.json({ status: "error", message: "Hubo un error el listado de carritos" })
        }
    };

    static createCart = async (req, res) => {
        try {
            const newCart = req.body;
            const result = await CartService.createCart(newCart);
            res.json({ status: "success", data: result, message: "Producto agregado al carrito" });
        } catch (error) {
            res.json({ status: "error", message: "Producto no agregado" });
        }
    };

    static addProductToCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const cart = await CartService.getCart(cartId);
            const product = await ProductService.getProduct(productId);
            if (product) {
                const productExist = cart.products.find(product => product.productId === productId);
            } else {
                const newProduct = {
                    product: productId,
                    quantity: 1
                }
                cart.products.push(newProduct);
            }

            const cartUpdated = await CartService.update(cartId, cart);
            res.json({ status: "success", data: cartUpdated });
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    };

    static getProductById = async (req, res) => {
        const cId = parseInt(req.params.cid);
        const prodFind = await CartService.getProductById({ id: cId });
        if (!prodFind) {
            res.send("El producto que buscas no existe");
        } else {
            res.send(prodFind);
        }
    };

    static deleteCartId = async (req, res) => {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const result = await CartService.deleteCartId({ id: [cartId, productId] });
        res.json({ status: "success", data: result, message: "Producto eliminado" });
    };

    static endPurchase(req, res) {

    };

};  