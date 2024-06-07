import JobModel from "../../models/jobModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";
import categoryModel from "../../models/categoryModel";

const router = Router();

router.delete(
  "/admin/delete-job/:jobId/:categoryId",
  async (req: Request, res: Response, next: NextFunction) => {

    const { jobId } = req.params;
    const { categoryId } = req.params;

    const admin = await UserModel.findById(req.currentUser?.id)
    if (admin?.role != 'Admin') {
       return next(new BadRequestError('not allowed to create, update or delete job!'))
    }
    const deletedJob =await JobModel.findByIdAndDelete(jobId,{new:true});
    // const deletedJob =await JobModel.findById(jobId);
    if (!deletedJob) {
      return next(new BadRequestError("can not delete job!"));
    }
    const category = await categoryModel.findByIdAndUpdate(
      categoryId,
      { $pull: { jobs: { job: jobId } } },
      { new: true }
    );
    
    const jobs =await JobModel.find();
    
    res.status(200).json({ succuss: true ,jobs});
  }
);

export { router as deleteJobRouter };
