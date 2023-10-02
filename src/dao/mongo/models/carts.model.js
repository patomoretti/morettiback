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
    price:Number,
    code:Number,
    stock:Number,
});

cartsSchema.plugin(mongoosePaginate);

export const cartsModel = mongoose.model(cartsCollection,cartsSchema);