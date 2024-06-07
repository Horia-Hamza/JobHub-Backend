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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserApplications = void 0;
const jobModel_1 = __importDefault(require("../../models/jobModel"));
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const userModel_1 = require("../../models/userModel");
const router = (0, express_1.Router)();
exports.currentUserApplications = router;
router.get("/user/applications", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    console.log((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt);
    const user = yield userModel_1.UserModel.findById((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id);
    if ((user === null || user === void 0 ? void 0 : user.role) != "User") {
        return next(new bad_request_1.BadRequestError("you are admin....you are not allowed to apply for jobs!!! "));
    }
    // Get jobs where the user has applied
    const applicationsJob = yield jobModel_1.default.find({
        "applications.appliedBy": (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.id,
    })
        .populate({
        path: 'applications',
        match: { 'appliedBy': (_d = req.currentUser) === null || _d === void 0 ? void 0 : _d.id },
        populate: {
            path: 'userApplication',
            match: { 'userId': (_e = req.currentUser) === null || _e === void 0 ? void 0 : _e.id }
        }
    });
    if (!applicationsJob) {
        return next(new bad_request_1.BadRequestError("can not find jobs!"));
    }
    res.status(200).json({ succuss: true, applicationsJob });
}));
