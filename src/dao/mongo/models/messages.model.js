import mongoose from "mongoose";

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
    user:{
        type:String,
        unique:true
    },
    message:{
        type:String,
        required:true
    }
});


export const messageModel = mongoose.model(messageCollection,messageSchema);