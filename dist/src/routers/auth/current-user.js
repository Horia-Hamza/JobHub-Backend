"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserRouter = void 0;
const express_1 = require("express");
const current_user_1 = require("../../../common/src/middleware/current-user");
const router = (0, express_1.Router)();
exports.currentUserRouter = router;
router.get("/current-user", current_user_1.currentUser, (req, res, next) => {
    try {
        // console.log("req.session?.jwt",req.session?.jwt);
        console.log("req.currentUser", req.currentUser);
        res.status(200).json({ message: "Done", currentUser: req.currentUser });
    }
    catch (error) {
        // console.log(error);
        // return next(new BadRequestError("can not find user"));
    }
});
