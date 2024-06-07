import { Request, Response, NextFunction, Router } from "express";
const router = Router()

 router.post("/logout", async(req: Request, res: Response, next: NextFunction)=>{
   req.session = null
   res.status(200).json({msg:'logout successfully'})

})
export{
   router as logoutRouter
}