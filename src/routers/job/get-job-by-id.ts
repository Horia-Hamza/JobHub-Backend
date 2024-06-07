import JobModel from "../../models/jobModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.get(
  "/job/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const job =await JobModel.findById(id);
    if (!job) {
      return next(new BadRequestError("can not find this job!"));
    }
    res.status(200).json({ succuss: true, job });
  }
);

export { router as findJobByIdRouter };
