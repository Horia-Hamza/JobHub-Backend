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
exports.deleteJobRouter = void 0;
const jobModel_1 = __importDefault(require("../../models/jobModel"));
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const userModel_1 = require("../../models/userModel");
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const router = (0, express_1.Router)();
exports.deleteJobRouter = router;
router.delete("/admin/delete-job/:jobId/:categoryId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { jobId } = req.params;
    const { categoryId } = req.params;
    const admin = yield userModel_1.UserModel.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id);
    if ((admin === null || admin === void 0 ? void 0 : admin.role) != 'Admin') {
        return next(new bad_request_1.BadRequestError('not allowed to create, update or delete job!'));
    }
    const deletedJob = yield jobModel_1.default.findByIdAndDelete(jobId, { new: true });
    // const deletedJob =await JobModel.findById(jobId);
    if (!deletedJob) {
        return next(new bad_request_1.BadRequestError("can not delete job!"));
    }
    const category = yield categoryModel_1.default.findByIdAndUpdate(categoryId, { $pull: { jobs: { job: jobId } } }, { new: true });
    const jobs = yield jobModel_1.default.find();
    res.status(200).json({ succuss: true, jobs });
}));
