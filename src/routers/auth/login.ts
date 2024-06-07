import { Router, Request, Response, NextFunction } from "express";
import { UserModel } from "../../models/userModel";
import { authService } from "../../../common/src/services/authentication";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../../common/src/index"
import ms from 'ms'
const router = Router();
router.post(
  "/auth/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return next(new BadRequestError('email and password are required!'));
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new BadRequestError("email dose not exist!"));
    }


    
    const isEqual = await authService.pwdCompare(user.password, password);


    if (!isEqual) {
      return next(new BadRequestError("pass not valid!"));
    }

    const token = jwt.sign(
      { email, id: user._id },
      process.env.JWT_KEY!,
    //  { expiresIn: '1h' } // ms('1m')// '1m' means 1 minute
    );
// if (token ===undefined) {
//   return next(new BadRequestError("token is expired!"));
// }
    const userUpdated = await UserModel.findOneAndUpdate(
      { email },
      {
        token
      },
      {
        new: true,
      },
    )
  // Create the response object
  const responseObject = {
    name: user.name,
    email: user.email,
    role: user.role,
    token:userUpdated?.token,
  };
    // req.session = { jwt: token };

    // console.log("req.session.jwt",req.session.jwt);
    res.status(200).json({ success: true,user:responseObject });
  }
);

export { router as loginRouter };
