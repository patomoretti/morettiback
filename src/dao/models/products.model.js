import mongoose from "mongoose";


const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    id:{
        type:Number
    },
    description:{
        type: String,
        required:true,
    },
    price:Number,
    code:Number,
    stock:Number,
    category:{
        type: String,
        required:true
    },

});



export const productsModel = mongoose.model(productsCollection,productsSchema);