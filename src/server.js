import express from 'express'
const app = express()


import dotenv from 'dotenv'
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended: false}))


import { connection }  from '../database/connection'


async function connectToDatabase() {
    try {
        await connection.authenticate();
        console.log("Connected")
    } catch (err) {
        console.log('Something went wrong')
        console.log('\n', err)
     }
    // await connection.sync()
}

connectToDatabase()

import { router as AccountRouter } from './router/account'
import { router as PostRouter } from './router/post'

app.use('/account', AccountRouter)
app.use('/post', PostRouter)

import path from 'path'
import { fileURLToPath, } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.resolve(__dirname, 'views')))

import { VerifyToken, VerifyTokenReverse } from './router/middlewares/index'


app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'views')))

console.log(path.resolve(__dirname, 'src', 'views', 'html', 'login', 'index.ejs'))

app.get('/login', (req, res) => {
    res.render(path.resolve(__dirname, 'views', 'html', 'login', 'index.ejs'))
 })

app.get('/register', VerifyTokenReverse, (req, res) => {
    res.render(path.join(__dirname, 'views', 'html', 'register', 'index.ejs'))
})
 
app.get('/dashboard', (req, res) => {
    res.render(path.join(__dirname, 'views', 'html', 'dashboard', 'index.ejs'))
})
app.get('/testing', (req, res) => {
    res.send('test')
})
 


import jwt from 'jsonwebtoken'
app.post('/verifyauthorization', (req, res) => { 


    const token = req.headers['authorization']


    if (!token) { return res.json({ error: true, status: 403, message: "Not authorized" }) }
    else {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
            res.locals.userInfo = decoded
            return res.json({ error: false, status: 200, message: "Success", tokeninfo: decoded })
        } catch (err) {
            return res.json({ error: true, status: 403, message: "Invalid token. Not authorized" })
         }
    }


})





app.listen(3333, () => console.log("Server is on..."))