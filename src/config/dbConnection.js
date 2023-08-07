import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb+srv://patomoretti:patito123@morettiback.ylwrggz.mongodb.net/ecommerce?retryWrites=true&w=majority");
        console.log("La base de datos esta conectada")
    } catch (error) {
        console.log(`Hubo un error conectando la base de datos ${error.message}`);
    }
}; 
