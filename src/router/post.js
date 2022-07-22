import express from "express";

export const router = express.Router();

import { PostController } from '../controllers/post'

import { VerifyToken } from './middlewares/index'


router.post('/create/:text',VerifyToken, PostController.create_post)
router.delete('/delete/:id',VerifyToken, PostController.post_delete)
router.put('/update/:id/:newText',VerifyToken, PostController.post_update) //update
router.get('/find/:id',VerifyToken, PostController.post_queryOne_get) //find
router.get('/findmany/:ownerId', PostController.post_queryMany_from_a_user_get) //find
router.get('/viewall', PostController.post_queryAll_get) //find

