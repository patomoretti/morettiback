import {connectDB} from "../config/dbConnection.js";
import { UsersMongo } from "./mongo/UsersMongo.js";
import { ProductMongo } from "./mongo/ProductMongo.js";
import { CartMongo } from "./mongo/CartMongo.js";

connectDB();
export const usersDao = new UsersMongo();
export const productDao = new ProductMongo();
export const cartDao = new CartMongo(); 