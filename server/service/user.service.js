const User = require("../DatabaseModel/user.model");

export class UserController {
    createUser = async ()=>{
        await User.create({
            
        })
    }
}