import { TicketsService } from "../services/ticket.service.js";
import { CartService } from "../services/cart.service.js";
import { ProductService } from "../services/product.service.js";

export class TicketsController{
    static async createTicket(req,res){
        try {
            const cartId = req.params.cid;
            const cartNumber = parseInt(cartId);
            const cart = await CartService.getCart(cartNumber);
            const productsCart = cart.products;
            let purchaseProducts = [];
            let rejectProducts = [];

            for(let i=0;i<productsCart.length;i++){
                const product = ProductService.getProduct(productsCart[i].productId);
                productsCart.forEach(product => {
                    if (product.quantity <= product.stock) {
                        purchaseProducts.push(product)
                        ProductService.updateProduct(product.productId ,{$inc: {stock: -product.quantity}})
                    }
                    res.json({status:"success", message:"Producto actualizado correctamente"})
                });
                
            }
            const newTicket = {
                code,
                purchase_datetime: new Date(),
                amount,
                purchaser: req.user.email,
            }
            await TicketsService.createTicket(newTicket)
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    }
}