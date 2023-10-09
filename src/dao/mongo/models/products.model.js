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
    price:{
        type: Number,
        required:true,
    },
    code:{
        type: Number,
        required:true,
    },
    stock:{
        type: Number,
        required:true,
    },
    category:{
        type: String,
        enum:["alimento","alimento canarios"],
        required:true
    },

});


productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection,productsSchema);