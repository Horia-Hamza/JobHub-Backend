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
exports.createJobRouter = void 0;
const jobModel_1 = __importDefault(require("../../models/jobModel"));
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const userModel_1 = require("../../models/userModel");
const categoryModel_1 = __importDefault(require("../../models/categoryModel")); // Import categoryDoc interface
const router = (0, express_1.Router)();
exports.createJobRouter = router;
router.post('/admin/create-job', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const admin = yield userModel_1.UserModel.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id);
        if (!admin || admin.role !== 'Admin') {
            return next(new bad_request_1.BadRequestError('Not allowed to create or update job!'));
        }
        const { categoryId, title, description, company, location, requirements, workPlace, careerLevel, jobType } = req.body;
        if (!categoryId || !title || !description || !company || !location || !requirements || !workPlace || !careerLevel || !jobType) {
            return next(new bad_request_1.BadRequestError('Missing inputs!'));
        }
        const job = jobModel_1.default.build({
            title, description, company, location, categoryId, requirements, workPlace, careerLevel, jobType, createdBy: ((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id) || ''
        });
        yield job.save();
        const newJob = yield jobModel_1.default.findById(job._id).populate({
            path: "categoryId",
            select: "title",
        });
        // Find the category by ID
        const category = yield categoryModel_1.default.findById(categoryId);
        if (!category) {
            return next(new bad_request_1.BadRequestError('Category not found!'));
        }
        // Extract the category title
        const categoryTitle = category.title;
        // Send response with category title
        res.status(200).json({ success: true, newJob });
    }
    catch (error) {
        console.error("Error creating job:", error);
        next(error); // Pass error to error handling middleware
    }
}));
