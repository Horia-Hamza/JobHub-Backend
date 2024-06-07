import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

declare global{
   interface JwtPayload{
      email: string,
      id: string
   }
   namespace Express{
      interface Request{
         currentUser?: JwtPayload
      }
   }
}

export const currentUser = (req: Request, res: Response, next: NextFunction)=>{
   const { authorization } = req.headers
if (!authorization) {
   return next()
}
try {
   const payLoad = (jwt.verify(authorization,process.env.JWT_KEY!)) as JwtPayload
   req.currentUser = payLoad 
} catch (error) {
   console.error('JWT Verification Error:', error);
return next()
}
next()
}