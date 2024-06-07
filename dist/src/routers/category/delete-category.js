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
exports.deleteCategoryRouter = void 0;
const jobModel_1 = __importDefault(require("../../models/jobModel"));
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const userModel_1 = require("../../models/userModel");
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const router = (0, express_1.Router)();
exports.deleteCategoryRouter = router;
router.delete("/admin/delete-category/:categoryId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { categoryId } = req.params;
    const admin = yield userModel_1.UserModel.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id);
    if ((admin === null || admin === void 0 ? void 0 : admin.role) != 'Admin') {
        return next(new bad_request_1.BadRequestError('not allowed to create, update or delete job!'));
    }
    const category = yield categoryModel_1.default.findById(categoryId);
    // Delete all jobs associated with the category
    const jobIds = (_b = category === null || category === void 0 ? void 0 : category.jobs) === null || _b === void 0 ? void 0 : _b.map(job => job.job);
    if (jobIds && jobIds.length > 0) {
        yield jobModel_1.default.deleteMany({ _id: { $in: jobIds } });
    }
    const deletedCategory = yield categoryModel_1.default.findByIdAndDelete(categoryId, { new: true });
    // const deletedJob =await JobModel.findById(jobId);
    if (!deletedCategory) {
        return next(new bad_request_1.BadRequestError("can not delete category!"));
    }
    res.status(200).json({ succuss: true, deletedCategory });
}));
