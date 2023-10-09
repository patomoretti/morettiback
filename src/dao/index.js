import {connectDB} from "../config/dbConnection.js";
import { UsersMongo } from "./mongo/managers/user.mongo.js";
import { ProductMongo } from "./mongo/managers/product.mongo.js";
import { CartMongo } from "./mongo/managers/cart.mongo.js";
import { OrdersMongo } from "./mongo/managers/order.mongo.js";
import { BusinessMongo } from "./mongo/managers/business.mongo.js";
import { TicketsMongo } from "./mongo/managers/ticket.mongo.js";


connectDB();
export const usersDao = new UsersMongo();
export const productDao = new ProductMongo();
export const cartDao = new CartMongo(); 
export const orderDao = new OrdersMongo();
export const businessDao = new BusinessMongo();
export const ticketsDao = new TicketsMongo(); 
