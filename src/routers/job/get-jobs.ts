import JobModel from "../../models/jobModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.get("/jobs", async (req: Request, res: Response, next: NextFunction) => {
  const jobs = await JobModel.find().populate({
    path: "categoryId",
    select: "title",
  });
  if (!jobs) {
    return next(new BadRequestError("can not find jobs!"));
  }
  res.status(200).json({ succuss: true, jobs });
});

export { router as findJobsRouter };
