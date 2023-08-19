import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    id:{
        type: Number,
        required:true,
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
        enum:["alimento","alimento canarios"],
        required:true
    },

});


productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection,productsSchema);