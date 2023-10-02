import { usersModel } from "../models/users.model.js";

export class UsersMongo{
    constructor(){
        this.model = usersModel();
    };

    async save(user){
        try {
            const userCreated = await this.model.create(user);
            return userCreated;
        } catch (error) {
            throw error;
        }
    };

    async getById(userId){
        try {
            const user=await this.model.findById(userId);
            if(user){
                return user;
            }else{
                throw new Error("El usuario no existe");
            }
        } catch (error) {
            throw error;
        }
    };

    async getByEmail(email){
        try {
            const user = await usersModel.find({email:email});
            if(user){
                return user;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    };

    async update(userId, newUserInfo){
        try {
            const userUpdated = await this.model.findByIdAndUpdate(userId,newUserInfo,{new:true});
            return userUpdated;
        } catch (error) {
            throw error;
        }
    };
}