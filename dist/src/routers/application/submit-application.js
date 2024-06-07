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
exports.submitApplicationRouter = void 0;
const applicationModel_1 = __importDefault(require("../../models/applicationModel"));
const jobModel_1 = __importDefault(require("../../models/jobModel"));
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const userModel_1 = require("../../models/userModel");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
exports.submitApplicationRouter = router;
router.post("/job/:jobId/submit-application", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { jobId } = req.params;
    const user = yield userModel_1.UserModel.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id);
    if ((user === null || user === void 0 ? void 0 : user.role) === "Admin") {
        return next(new bad_request_1.BadRequestError("employee can not apply for jobs! "));
    }
    const { email, phone, yearsOfExperience, expectedSalary, coverLetter } = req.body;
    if (!email || !coverLetter || !phone || !yearsOfExperience || !expectedSalary) {
        return next(new bad_request_1.BadRequestError("missing inputs!"));
    }
    // Check if the user has already applied for the job
    const existingApplication = yield applicationModel_1.default.findOne({
        userId: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
        jobId,
    });
    if (existingApplication) {
        return next(new bad_request_1.BadRequestError("You already applied for this job!"));
    }
    let jobIdObject = new mongoose_1.default.Types.ObjectId(jobId);
    let userIdObject = new mongoose_1.default.Types.ObjectId((_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.id);
    const newApplication = applicationModel_1.default.build({
        email,
        phone,
        yearsOfExperience,
        expectedSalary,
        coverLetter,
        jobId: jobIdObject,
        userId: userIdObject,
    });
    yield newApplication.save();
    const job = yield jobModel_1.default.findByIdAndUpdate(jobId, {
        $inc: { applicationsNumber: 1 },
        applied: true,
        $push: {
            applications: {
                appliedBy: (_d = req.currentUser) === null || _d === void 0 ? void 0 : _d.id,
                userApplication: newApplication._id,
            },
        },
    }, { new: true });
    if (!job) {
        return next(new bad_request_1.BadRequestError("can not find and update job!"));
    }
    res
        .status(200)
        .json({ succuss: true, newApplication: newApplication, job: job });
}));
