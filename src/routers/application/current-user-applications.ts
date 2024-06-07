import JobModel from "../../models/jobModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";

const router = Router();

router.get(
  "/user/applications",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session?.jwt);
    const user = await UserModel.findById(req.currentUser?.id);
    if (user?.role != "User") {
      return next(
        new BadRequestError(
          "you are admin....you are not allowed to apply for jobs!!! "
        )
      );
    }
    // Get jobs where the user has applied
    const applicationsJob = await JobModel.find({
      "applications.appliedBy": req.currentUser?.id,
    })
    .populate({
       path: 'applications',
       match: { 'appliedBy': req.currentUser?.id },
       populate: {
           path: 'userApplication',
           match: { 'userId': req.currentUser?.id }
       }
    });
    if (!applicationsJob) {
      return next(new BadRequestError("can not find jobs!"));
    }

     res.status(200).json({ succuss: true, applicationsJob });
  }
);

export { router as currentUserApplications };
