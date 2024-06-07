"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsersRouter = void 0;
const userModel_1 = require("../../models/userModel");
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.findUsersRouter = router;
router.get("/admin/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const admin = yield userModel_1.UserModel.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id);
    if ((admin === null || admin === void 0 ? void 0 : admin.role) != "Admin") {
        return next(new bad_request_1.BadRequestError("not allowed to show all users!"));
    }
    const users = yield userModel_1.UserModel.find();
    if (!users) {
        return next(new bad_request_1.BadRequestError("can not find users!"));
    }
    res.status(200).json({ succuss: true, users });
}));
