import JobModel from "../../models/jobModel";
import ApplicationModel from "../../models/applicationModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";

const router = Router();

router.get(
  "/admin/job/:jobId/application/:applicationId",
  async (req: Request, res: Response, next: NextFunction) => {

    const { jobId,applicationId } = req.params;

    const admin = await UserModel.findById(req.currentUser?.id);
    if (admin?.role != "Admin") {
      return next(
        new BadRequestError("not allowed to show or edit applications!")
      );
    }
    const job =await JobModel.findById(jobId)
    if (!job) {
      return next(new BadRequestError("can not find job!"));
    }

    const Application =await ApplicationModel.findById(applicationId).populate("jobId")
    if (!Application) {
      return next(new BadRequestError("can not find Application!"));
    }

    res.status(200).json({ succuss: true, Application });
  }
);

export { router as getApplicationRouter };
