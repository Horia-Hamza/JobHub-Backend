import { UserModel } from "../../models/userModel";
import { BadRequestError } from "../../../common/src/errors/bad-request";
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.get(
  "/admin/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = await UserModel.findById(req.currentUser?.id);
    if (admin?.role != "Admin") {
      return next(new BadRequestError("not allowed to show all users!"));
    }
    const users = await UserModel.find();
    if (!users) {
      return next(new BadRequestError("can not find users!"));
    }
    res.status(200).json({ succuss: true, users });
  }
);

export { router as findUsersRouter };
