import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request,Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";
import categoryModel, { CreateCategoryDto } from "../../models/categoryModel";

const router = Router()

router.post('/admin/categories/create-category', async(req: Request, res: Response, next: NextFunction) => {
   try {
     const admin = await UserModel.findById(req.currentUser?.id);
     if (!admin || admin.role !== 'Admin') {
       throw new BadRequestError('Not allowed to create or update category!');
     }
 
     const { title } = req.body;
     if (!title) {
       throw new BadRequestError('Title is required!');
     }
 
     // Validate the title against the enum values
     const enumValues = ["Accounting", "Engineering-Construction/Civil/Architecture", "Writing/Editorial", "IT/Software Development", "manufacturing/Production", "Quality", "Medical/Healthcare", "Customer Service/Support", "Business Development"];
     if (!enumValues.includes(title)) {
       throw new BadRequestError('Invalid category title!');
     }
 
     const categoryDto: CreateCategoryDto = {
       title,
       createdBy: req.currentUser?.id || ''
     };
 
     const category = categoryModel.build(categoryDto);
     await category.save();
 
     res.status(200).json({ success: true, category });
   } catch (error) {
     next(error);
   }
 });

export{
   router as createCategoryRouter
}