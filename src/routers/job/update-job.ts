import JobModel from "../../models/jobModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";
import { currentUser } from "../../../common/src/middleware/current-user";

const router = Router();

router.put(
  "/admin/update-job/:jobId",
  async (req: Request, res: Response, next: NextFunction) => {
     
    const { jobId } = req.params;
    const { categoryId,title, description, company, location, requirements,jobType,careerLevel,workPlace } = req.body;

    const admin = await UserModel.findById(req.currentUser?.id);
    if (!admin || admin?.role != "Admin") {
      return next(new BadRequestError("not allowed to create or update job!"));
    }
    const job = await JobModel.findByIdAndUpdate(
       jobId ,
      {
        title,
        description,
        company,
        location,
        requirements,
        updatedBy: req.currentUser?.id,
        jobType,
        careerLevel,
        workPlace,
        categoryId
      },
      { new: true }
    );

    const updatedJob = await JobModel.findById(jobId).populate({
      path: "categoryId",
      select: "title", 
    });
    if (!updatedJob) {
      return next(new BadRequestError("can not find or update job!"));
    }
    res.status(200).json({ succuss: true, updatedJob });
   }
);

export { router as updateJobRouter };
