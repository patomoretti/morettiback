export class UsersDto{
    constructor(user){
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.fullName = `${user.first_name} ${user.last_name}`;
        this.age = user.age;
        this.email = user.email
    };  
};
 