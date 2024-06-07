import JobModel from "../../models/jobModel";
import ApplicationModel from "../../models/applicationModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";

const router = Router();

router.get(
  "/admin/job/:jobId/applications",
  async (req: Request, res: Response, next: NextFunction) => {
const {jobId} = req.params

    const admin = await UserModel.findById(req.currentUser?.id);
    if (admin?.role != "Admin") {
      return next(
        new BadRequestError("not allowed to show or edit applications!")
      );
    }
    const applications =await ApplicationModel.find({jobId}).populate("jobId")
     if (!applications || applications.length === 0) {
      return res.status(404).json({ success: false, message: "No applications found" });
    }
    // console.log("applications",applications);
    
    res.status(200).json({ succuss: true, applications });
  }
);

export { router as allApplicationsRouter };
