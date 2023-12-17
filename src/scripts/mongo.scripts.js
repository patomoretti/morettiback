import mongoose from "mongoose";
import { productsModel } from "../dao/mongo/models/products.model.js";
import { config } from "../config/config.js";

const updateProducts = async()=>{
    try {
        await mongoose.connect(config.mongo.url);
        console.log("base de datos conectada");
        const adminId= "65738d41393476430e063945";
        const result = await productsModel.updateMany({},{$set:{owner:adminId}});
        console.log(result);
    } catch (error) {
        console.log(error);
    } finally{
        await mongoose.connection.close();
    }
};
 
updateProducts(); 