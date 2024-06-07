import ApplicationModel from "../../models/applicationModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";
import { UserModel } from "../../models/userModel";
import { currentUser } from "common/src/middleware/current-user";

const router = Router();

router.put(
  "/admin/update-application/:applicationId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { applicationId } = req.params;
    const { applicationStatus } = req.body;

    const admin = await UserModel.findById(req.currentUser?.id);
    if (admin?.role === "User") {
      return next(
        new BadRequestError("not allowed to show or edit application!")
      );
    }
    // const application =await ApplicationModel.findById(applicationId);
    // if (!application) {
    //   return next(new BadRequestError("can not find application!"));
    // }
    if(!applicationStatus || applicationStatus === ''){
      return next(
        new BadRequestError("select application status!")
      );
    }
    const updatedApplication = await ApplicationModel.findByIdAndUpdate(
      applicationId,
      {
        applicationStatus,
      },
      { new: true }
    );
    res.status(200).json({ succuss: true, updatedApplication });
  }
);

export { router as updateApplicationRouter };
