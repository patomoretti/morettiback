import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    // title:{
    //     type:String,
    //     required:true
    // },
    // description:{
    //     type:String,
    //     required:true
    // },
    // price:{
    //     type:Number,
    //     required:true
    // },
    // code:{
    //     type:Number,
    //     required:true
    // },
    // stock:{
    //     type:Number,
    //     required:true
    // },
    products: {
        type: [
            {
                quantity: {
                    type: Number,
                    default: 1
                },
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        default: []
    }
});

cartsSchema.plugin(mongoosePaginate);

export const cartsModel = mongoose.model(cartsCollection,cartsSchema);