import {usersModel} from "../models/users.model.js";

export class UsersMongo{
    constructor(){
        this.model = usersModel;
    };

    async save(user){
        try {
            const userCreated = await usersModel.create(user);
            return userCreated;
        } catch (error) {
            throw error;
        }
    };

    async getById(userId){
        try {
            const user = await usersModel.findById(userId).lean();
            if(user){
                return user;
            } else{
                console.log("El usuario no existe");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    async getByEmail(email){
        try {
            const user = await usersModel.findOne({email:email}).lean();
            if(user){
                return user;
            } else{
                return null;
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    async update(userId,newUserInfo){
        try {
            const userUpdated = await usersModel.findByIdAndUpdate(userId,newUserInfo,{new:true})
            return userUpdated;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };
};