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
exports.signupRouter = void 0;
const express_1 = require("express");
const userModel_1 = require("../../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../../../common/src/index");
const express_validator_1 = require("express-validator");
const validation_request_1 = require("../../../common/src/middleware/validation-request");
const router = (0, express_1.Router)();
exports.signupRouter = router;
router.post("/auth/signup", [
    (0, express_validator_1.body)('email').not().isEmpty().isEmail().withMessage('a valid email is required!')
], validation_request_1.validationRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return next(new index_1.BadRequestError('name, email and password are required!'));
        }
        const userByEmail = yield userModel_1.UserModel.findOne({ email });
        if (userByEmail) {
            console.log('sdsdsdsdsds');
            return next(new index_1.BadRequestError("user with this email already exist!"));
        }
        const user = userModel_1.UserModel.build({
            name,
            email,
            password,
            role: role === 'Admin' ? 'Admin' : 'User'
        });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, { expiresIn: "10h" });
        const newUser = yield userModel_1.UserModel.findOneAndUpdate({ email }, {
            token
        }, {
            new: true,
        });
        res.status(201).json({ success: true, newUser });
        // the expiresIn option can be expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
    }
    catch (error) {
        next(error);
    }
}));
