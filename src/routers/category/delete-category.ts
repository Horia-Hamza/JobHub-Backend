import JobModel from "../../models/jobModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";
import categoryModel from "../../models/categoryModel";

const router = Router();

router.delete(
  "/admin/delete-category/:categoryId",
  async (req: Request, res: Response, next: NextFunction) => {

    const { categoryId } = req.params;

    const admin = await UserModel.findById(req.currentUser?.id)
    if (admin?.role != 'Admin') {
       return next(new BadRequestError('not allowed to create, update or delete job!'))
    }
    const category = await categoryModel.findById(categoryId);

      // Delete all jobs associated with the category
      const jobIds = category?.jobs?.map(job => job.job);
      if (jobIds && jobIds.length > 0) {
        await JobModel.deleteMany({ _id: { $in: jobIds } });
      }

    const deletedCategory =await categoryModel.findByIdAndDelete(categoryId,{new:true});
    // const deletedJob =await JobModel.findById(jobId);
    if (!deletedCategory) {
      return next(new BadRequestError("can not delete category!"));
    }
    res.status(200).json({ succuss: true ,deletedCategory});
  }
);

export { router as deleteCategoryRouter };
