import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended: false}))

import { connection } from '../database/connection'


async function connectToDatabase() { 
    await connection.authenticate();
    // await connection.sync()
    console.log("Connected")
}

connectToDatabase()

import { router as AccountRouter } from './router/account'
import { router as PostRouter } from './router/post'

app.use('/account', AccountRouter)
app.use('/post', PostRouter)




app.listen(3333, () => console.log("Server is on..."))