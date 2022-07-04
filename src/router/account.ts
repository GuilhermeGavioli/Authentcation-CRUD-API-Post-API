import express from 'express'
import { accountControllers } from '../controllers/account';

export const router = express.Router();



import { VerifyTokenReverse } from '../router/middlewares/index'


router.post('/register',VerifyTokenReverse, accountControllers.register_post)
router.post('/login', VerifyTokenReverse, accountControllers.login_post)
router.get('/viewall', accountControllers.view_all_users_get)
