import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
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
        type: String,
        required:true,
    },
    code:{
        type: String,
        required:true,
    },
});

cartsSchema.plugin(mongoosePaginate);

export const cartsModel = mongoose.model(cartsCollection,cartsSchema);