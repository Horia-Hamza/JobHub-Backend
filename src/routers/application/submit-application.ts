import ApplicationModel from "../../models/applicationModel";
import JobModel from "../../models/jobModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";
import mongoose from "mongoose";

const router = Router();

router.post(
  "/job/:jobId/submit-application",
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.params;

    const user = await UserModel.findById(req.currentUser?.id);
    if (user?.role === "Admin") {
      return next(new BadRequestError("employee can not apply for jobs! "));
    }
    const { email, phone, yearsOfExperience, expectedSalary, coverLetter } =
      req.body;
    if (!email || !coverLetter || !phone || !yearsOfExperience || !expectedSalary ) {
      return next(new BadRequestError("missing inputs!"));
    }
    // Check if the user has already applied for the job
    const existingApplication = await ApplicationModel.findOne({
      userId: req.currentUser?.id,
      jobId,
    });

    if (existingApplication) {
      return next(
        new BadRequestError("You already applied for this job!")
      );
    }
    let jobIdObject =new mongoose.Types.ObjectId(jobId)
    let userIdObject =new mongoose.Types.ObjectId(req.currentUser?.id)
    
    const newApplication = ApplicationModel.build({
      email,
      phone,
      yearsOfExperience,
      expectedSalary,
      coverLetter,
      jobId:jobIdObject,
      userId: userIdObject,
    });
    await newApplication.save();

    const job = await JobModel.findByIdAndUpdate(
      jobId,
      {
        $inc: { applicationsNumber: 1 },
        applied: true,
        $push: {
          applications: {
            appliedBy: req.currentUser?.id,
            userApplication: newApplication._id,
          },
        },
      },
      { new: true }
    );

    if (!job) {
      return next(new BadRequestError("can not find and update job!"));
    }
    res
      .status(200)
      .json({ succuss: true, newApplication: newApplication, job: job });
  }
);

export { router as submitApplicationRouter };
