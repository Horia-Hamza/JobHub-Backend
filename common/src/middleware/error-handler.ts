import {Request, Response, NextFunction} from 'express'
import { CustomError } from '../index'

export const errorHandler = (error:Error, req: Request, res: Response, next:NextFunction)=>{
if(error instanceof CustomError){
return res.status(error.statusCode).json({message:error.generateErrors()})
}
return res.status(500).json({message:'something went wrong from error handler !',error})
}
