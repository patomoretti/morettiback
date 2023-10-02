import {config} from "../config/config.js";

const persistence = config.server.persistence;


let usersDao;
let productDao;
let cartDao;
let orderDao;

switch (persistence) {
    case "mongo":
        const {connectDB} = await import("../config/dbConnection.js");
        connectDB();
        //importando los managers
        const {UsersMongo} = await import ("./mongo/UsersMongo.js");
        const {ProductMongo} = await import ("./mongo/ProductMongo.js");
        const {CartMongo} = await import ("./mongo/CartMongo.js");
        const {OrdersMongo} = await import ("./mongo/OrderMongo.js");
        usersDao = new UsersMongo();
        productDao = new ProductMongo();
        cartDao = new CartMongo();
        orderDao = new OrdersMongo();
        break;

    default:
        break;
};

export {usersDao,productDao,cartDao,orderDao};