interface IUserClass {
    exists(email: string): Promise<boolean>,
    create(user: IUser): Promise<void>,
    find(emailParam: string): Promise<IUser>,
    findAll(): Promise<ISecureUser[]>
}

interface IUser {
    id: string,
    name: string,
    email: string,
    password: string,
}
 
interface ISecureUser { 
    name: string,
}


import { User } from "../../models/user"

class UserClass implements IUserClass {

    //Check If User Exists
    async exists(email: string) {
        const returned = await User.findOne({
            where: {
                email: email
            }
        })
        if (returned) return true
        return false
    }
    

    //Create User
    async create(user: IUser): Promise<void> {
        await User.create({
            id: user.id, name: user.name, email: user.email, password: user.password
        })
    }
    

    //Find a User
    async find(emailParam: string): Promise<IUser> {
        //Find user
        const returned = await User.findOne({
            attributes: ["id", "name", "email", "password"],
            where: {
                email: emailParam
            }
        })
        const { id, name, email, password } = JSON.parse(JSON.stringify(returned))
        return { id, name, email, password } // return user
    }
    
    async findAll() {
        return JSON.parse(
            JSON.stringify(
                await User.findAll({
                    attributes: ["name"]
                })
            )
        )

    }

    
} 

export const UserInstancy = new UserClass();

