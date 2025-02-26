import { Router,Request,Response,NextFunction } from "express"
import { validationResult } from "express-validator"
import { RequestValidationError } from '../errors/request-validation-errors'

const validationRequest = async(req: Request, res: Response, next: NextFunction)=>{
   const errors = validationResult(req)

   if(!errors.isEmpty()) {
       return next(new RequestValidationError(errors.array()))
   }

   next()
}

export {
   validationRequest
}