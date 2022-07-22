

import { uuid } from 'uuidv4'
import { PostInstancy } from '../Repository/PostRepository'

import dotenv from 'dotenv'
dotenv.config();

export const PostController = {

    create_post: async function (req, res) {
        const { text } = req.params
        const { userInfo } = res.locals
        try {
            await PostInstancy.create(uuid(), text.toString(), userInfo.id.toString() )            
            return res.json({ error: false, status: 200, message: "Successfully created." })

        } catch (err) {
            return res.json("Ops, something went wrong.")
         }

    },

    post_delete: async function (req, res) {
        const { id } = req.params
        const { userInfo } = res.locals

        
        const returnedPost = await PostInstancy.findOne(id)

        if (returnedPost.owner.toString() !== userInfo.id.toString()) {
            return res.json("This post does not belong to you.")
        } else { 

            try {
                const deletePost = await PostInstancy.delete(id, userInfo.id)
                return res.json({ error: false, status: 200, message: "Successfully deleted.", post:  deletePost})
            } catch (err) {
                return res.json("Ops, something went wrong.")
             }

        }

    },
    post_update: async function (req, res) {
        const { id, newText } = req.params
        const { userInfo } = res.locals
    

        const returnedPost = await PostInstancy.findOne(id)

        if (returnedPost.owner.toString() !== userInfo.id.toString()) {
            return res.json("This post does not belong to you.")
        } else {

            try {
                await PostInstancy.update(id, userInfo.id, newText)
                return res.json({ error: false, status: 200, message: "Successfully updated." })
            } catch (err) {
                return res.json("Ops, something went wrong.")
            }

        }
    },
    post_queryOne_get: async function (req, res) {
        const { id } = req.params
        // const { userInfo } = res.locals
        try {
            const returnedPost = await PostInstancy.findOne(id)
            return res.json({ error: false, status: 200, message: "Successfully querried.", post: returnedPost })
        } catch (err) {
            return res.json("Ops, something went wrong.")
        }
        
    },
    post_queryMany_from_a_user_get: async function (req, res) {
        const { ownerId } = req.params
        // const { userInfo } = res.locals
        try {
            const returnedPost = await PostInstancy.findManyFromUser(ownerId)
            return res.json({ error: false, status: 200, message: "Successfully querried.", post: returnedPost })
        } catch (err) {
            return res.json("Ops, something went wrong.")
        }
        
    },
    //query many posts from a user

    // query all posts from db
    post_queryAll_get: async function (req, res) {
        try { 
            const allPosts = await PostInstancy.findAll();
            return res.json({ error: false, status: 200, message: "Successfully querried.", post: allPosts})
        } catch (err) {
            return res.json("Ops, something went wrong. Could not query all.")
        }
    
    },




}