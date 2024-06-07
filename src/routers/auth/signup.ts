import { Router,Request,Response,NextFunction } from "express"
import {UserModel} from "../../models/userModel"
import jwt from "jsonwebtoken"
import { BadRequestError } from "../../../common/src/index"
import {body} from 'express-validator'
import { validationRequest } from "../../../common/src/middleware/validation-request"
const router = Router()

router.post("/auth/signup", [
   body('email').not().isEmpty().isEmail().withMessage('a valid email is required!')
], validationRequest , async(req: Request, res: Response, next: NextFunction)=>{
   try {
      const {name, email, password,role} = req.body
      if (!name || !email || !password) {
         return next( new BadRequestError('name, email and password are required!'))
      }
      const userByEmail = await UserModel.findOne({email})
      if (userByEmail){
         console.log('sdsdsdsdsds');
         return next(new BadRequestError("user with this email already exist!"))
      } 
   
      const user = UserModel.build({
         name,
         email,
         password,
         role: role==='Admin'? 'Admin': 'User'
      })
      await user.save()
      
      const token = jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY!,{expiresIn: "10h"})
     
      const newUser = await UserModel.findOneAndUpdate(
         { email },
         {
           token
         },
         {
           new: true,
         },
       )
      res.status(201).json({success: true, newUser})
      // the expiresIn option can be expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
   } catch (error) {
      next(error);
   }
  
})

export {router as signupRouter}

