import {Request, Response, NextFunction} from "express"
import {NotAuthorizedError} from "../index"
export const requireAuth = async(req: Request, res: Response, next: NextFunction)=>{
   // console.log(req.currentUser);
   if (!req.currentUser) return next( new NotAuthorizedError())
   next()
}