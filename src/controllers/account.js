


import { Post } from "../../models/post";

import { uuid } from 'uuidv4';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


import dotenv from 'dotenv'
dotenv.config()


import { UserInstancy } from "../Repository/UserRepository";








export const accountControllers = {

    register_post: async (req, res) => { 
        const { name, email, password } = req.body
        const id = uuid()

        try {

            const userExists = await UserInstancy.exists(email)
            if (userExists) {
                res.locals.message = "User already exists."
                throw new Error("User already exists.")
            }

            const safePassword = await bcrypt.hash(password, 10);

            await UserInstancy.create({ id, name, email, password: safePassword})

            const token = jwt.sign({ id, name, email }, process.env.SECRET_TOKEN, { expiresIn: '1h' })
            
            return res.json({ error: false, status: 200, message: "User Successfully created.", token })
            
        } catch (err) {
            return res.json({error: true, status: 401, message: `Failed. ${res.locals.message}`})
        }
    },

    login_post: async (req, res) => { 
        const { email, password } = req.body
        console.log(email, password)
        try {

            const userExists = await UserInstancy.exists(email)

            if (!userExists) {
                res.locals.message = "User does not exist."
                throw new Error("User does not exist.")
            }
            
            const foundUser = await UserInstancy.find(email)
            
            const passwordMatch = await bcrypt.compare(password, foundUser.password)
            if (!passwordMatch) {
                res.locals.message = "Passwords do not match."
                throw new Error("Passwords do not match.")
            }
           
            const token = jwt.sign({ id: foundUser.id, name: foundUser.name, email: foundUser.email }, process.env.SECRET_TOKEN, { expiresIn: '1h' })
            return res.json({error: false, status: 200, message: "Success.", token})
           
        } catch (err) {
            return res.json({error: true, status: 400, message: `Failed. ${res.locals.message}`})
    }

    },

    view_all_users_get: async (req, res) => { 

        try { 
            const allPosts = await UserInstancy.findAll();
            return res.json({ error: false, status: 200, message: "Successfully querried.", post: allPosts})
        } catch (err) {
            return res.json("Ops, something went wrong. Could not query all.")
        }


    }


   

}

