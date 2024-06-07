import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request,Response, NextFunction, Router } from "express";
import categoryModel from "../../models/categoryModel";

const router = Router()

router.get('/categories', async(req:Request, res:Response, next: NextFunction)=>{
const categories =await categoryModel.find()
if (!categories) {
return next(new BadRequestError('can not find categories!'))
}
res.status(200).json({succuss: true, categories})
})

export{
   router as findCategoriesRouter
}