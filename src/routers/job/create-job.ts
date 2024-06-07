import JobModel from "../../models/jobModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";
import categoryModel, { categoryDoc } from "../../models/categoryModel"; // Import categoryDoc interface

const router = Router();

router.post('/admin/create-job', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admin = await UserModel.findById(req.currentUser?.id);
    if (!admin || admin.role !== 'Admin') {
      return next(new BadRequestError('Not allowed to create or update job!'));
    }

    const {categoryId, title, description, company, location, requirements, workPlace, careerLevel, jobType } = req.body;

    if (!categoryId||!title || !description || !company || !location || !requirements || !workPlace || !careerLevel || !jobType) {
      return next(new BadRequestError('Missing inputs!'));
    }

    const job = JobModel.build({
      title, description, company, location, categoryId, requirements, workPlace, careerLevel, jobType, createdBy: req.currentUser?.id || ''
    });
    await job.save();
    const newJob = await JobModel.findById(job._id).populate({
      path: "categoryId",
      select: "title", 
    });

    // Find the category by ID
    const category: categoryDoc | null = await categoryModel.findById(categoryId);

    if (!category) {
      return next(new BadRequestError('Category not found!'));
    }

    // Extract the category title
    const categoryTitle: string = category.title;
    // Send response with category title
    res.status(200).json({ success: true, newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    next(error); // Pass error to error handling middleware
  }
});

export { router as createJobRouter };
