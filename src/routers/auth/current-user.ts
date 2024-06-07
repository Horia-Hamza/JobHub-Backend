import { Router, Request, Response, NextFunction } from "express";
import { currentUser } from "../../../common/src/middleware/current-user";
import { BadRequestError } from "../../../common/src";
const router = Router();

router.get(
  "/current-user", currentUser, (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log("req.session?.jwt",req.session?.jwt);
      console.log( "req.currentUser",req.currentUser );
      res.status(200).json({ message: "Done", currentUser: req.currentUser });
    } catch (error) {
      // console.log(error);
      
      // return next(new BadRequestError("can not find user"));
    }
  }
);
export { router as currentUserRouter };
