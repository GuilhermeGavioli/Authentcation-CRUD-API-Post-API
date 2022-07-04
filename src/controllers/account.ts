import { Request, Response } from "express"

import { uuid } from 'uuidv4';
import { Post } from "../../models/post";

import jwt from 'jsonwebtoken'



import dotenv from 'dotenv'
dotenv.config()


import { UserInstancy } from "../Repository/UserRepository";



const secretToken: string = (process.env.SECRET_TOKEN as string);




export const accountControllers = {

    register_post: async (req: Request, res: Response) => { 
        const { name, email, password } = req.body
        const id = uuid()
        
        try {

            const userExists = await UserInstancy.exists(email)
            if (userExists) {
                res.locals.message = "User already exists."
                throw new Error("User already exists.")
            }
            await UserInstancy.create({ id, name, email, password })

            const token = jwt.sign({ id, name, email }, secretToken, { expiresIn: '1h' })
            
            return res.json({ error: false, status: 200, message: "User Successfully created.", token })
            
        } catch (err) {
            return res.json({error: true, status: 401, message: `Failed. ${res.locals.message}`})
        }
    },

    login_post: async (req: Request, res: Response) => { 
        const { email, password } = req.body
        try {

            const userExists = await UserInstancy.exists(email)

            if (!userExists) {
                res.locals.message = "User does not exist."
                throw new Error("User does not exist.")
            }

            const foundUser = await UserInstancy.find(email)

            const token = jwt.sign({ id: foundUser.id, name: foundUser.name, email: foundUser.email }, secretToken, { expiresIn: '1h' })
           
            return res.json({error: false, status: 200, message: "Success.", token})
           
            
            
        } catch (err) {
            
            return res.json({error: true, status: 400, message: `Failed. ${res.locals.message}`})
    }

    },

    view_all_users_get: async (req: Request, res: Response) => { 

        try { 
            const allPosts = await UserInstancy.findAll();
            return res.json({ error: false, status: 200, message: "Successfully querried.", post: allPosts})
        } catch (err) {
            return res.json("Ops, something went wrong. Could not query all.")
        }


    }


   

}
