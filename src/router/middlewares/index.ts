import { Request, Response, NextFunction} from 'express'
const secretToken: string = (process.env.SECRET_TOKEN as string);

import jwt from 'jsonwebtoken'



export async function VerifyTokenReverse(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']
    if (!token) next();
    
    else { 
        try {
            const decoded = jwt.verify(token, secretToken)
            console.log("decoded", decoded)
            res.json({ error: true, status: 401, message: '*Redirected*, User is logged in, not authorized to make requests' })
            
        } catch (err) {
            next()
        }
         
    }
}

export async function VerifyToken(req: Request, res: Response, next: NextFunction) {
  
    const token = req.headers['authorization']

    if (!token) return res.json({ error: true, status: 403, message: "Not authorized" })
    else {
        try {
            const decoded = jwt.verify(token, secretToken)
            res.locals.userInfo = decoded
            next()
        } catch (err) {
            return res.json({ error: true, status: 403, message: "Invalid token. Not authorized" })
         }
    }

}