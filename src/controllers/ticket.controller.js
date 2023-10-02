import { TicketsService } from "../services/ticket.service.js";
import { CartService } from "../services/cart.service.js";
import { ProductService } from "../services/product.service.js";

export class TicketsController{
    static async createTicket(req,res){
        try {
            const cartId = req.params.cid;
            const cart = await CartService.getCart(cartId);
            const productsCart = cart.products;
            let purchaseProducts = [];
            let rejectProducts = [];
            //iteramos por cada producto del carrito
            for(let i=0;i<productsCart.length;i++){
                const product = ProductService.getProduct(productsCart[i].productId);
                if (quantity < product.stock) {
                    
                } else {
                    product.push(purchaseProducts);
                    product.stock = quantity;
                    res.json({status:"success", message:"Producto actualizado correctamente"})
                }
            }
            const newTicket = {
                code,
                purchase_datetime: new Date(),
                amount,
                purchaser: req.user.email,
            }
            const ticketCreated = await TicketsService.createTicket(newTicket)
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    }
}