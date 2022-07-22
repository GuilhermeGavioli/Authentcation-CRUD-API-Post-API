
import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken'



export async function VerifyTokenReverse(req, res, next) {
    console.log('token here')
    const token = req.headers['authorization']
    if (!token) next();
    
    else { 
        try {
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
            console.log("decoded", decoded)
            res.json({ error: true, status: 401, message: '*Redirected*, User is logged in, not authorized to make requests' })
            
        } catch (err) {
            next()
        }
         
    }
}

export async function VerifyToken(req, res, next) {
  
    const token = req.headers['authorization']


    if (!token) return res.json({ error: true, status: 403, message: "Not authorized" })
    else {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
            res.locals.userInfo = decoded
            next()
        } catch (err) {
            return res.json({ error: true, status: 403, message: "Invalid token. Not authorized" })
         }
    }

}