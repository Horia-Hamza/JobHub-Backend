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
exports.createCategoryRouter = void 0;
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const userModel_1 = require("../../models/userModel");
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const router = (0, express_1.Router)();
exports.createCategoryRouter = router;
router.post('/admin/categories/create-category', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const admin = yield userModel_1.UserModel.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id);
        if (!admin || admin.role !== 'Admin') {
            throw new bad_request_1.BadRequestError('Not allowed to create or update category!');
        }
        const { title } = req.body;
        if (!title) {
            throw new bad_request_1.BadRequestError('Title is required!');
        }
        // Validate the title against the enum values
        const enumValues = ["Accounting", "Engineering-Construction/Civil/Architecture", "Writing/Editorial", "IT/Software Development", "manufacturing/Production", "Quality", "Medical/Healthcare", "Customer Service/Support", "Business Development"];
        if (!enumValues.includes(title)) {
            throw new bad_request_1.BadRequestError('Invalid category title!');
        }
        const categoryDto = {
            title,
            createdBy: ((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id) || ''
        };
        const category = categoryModel_1.default.build(categoryDto);
        yield category.save();
        res.status(200).json({ success: true, category });
    }
    catch (error) {
        next(error);
    }
}));
