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
exports.loginRouter = void 0;
const express_1 = require("express");
const userModel_1 = require("../../models/userModel");
const authentication_1 = require("../../../common/src/services/authentication");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../../../common/src/index");
const router = (0, express_1.Router)();
exports.loginRouter = router;
router.post("/auth/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new index_1.BadRequestError('email and password are required!'));
    }
    const user = yield userModel_1.UserModel.findOne({ email });
    if (!user) {
        return next(new index_1.BadRequestError("email dose not exist!"));
    }
    const isEqual = yield authentication_1.authService.pwdCompare(user.password, password);
    if (!isEqual) {
        return next(new index_1.BadRequestError("pass not valid!"));
    }
    const token = jsonwebtoken_1.default.sign({ email, id: user._id }, process.env.JWT_KEY);
    // if (token ===undefined) {
    //   return next(new BadRequestError("token is expired!"));
    // }
    const userUpdated = yield userModel_1.UserModel.findOneAndUpdate({ email }, {
        token
    }, {
        new: true,
    });
    // Create the response object
    const responseObject = {
        name: user.name,
        email: user.email,
        role: user.role,
        token: userUpdated === null || userUpdated === void 0 ? void 0 : userUpdated.token,
    };
    // req.session = { jwt: token };
    // console.log("req.session.jwt",req.session.jwt);
    res.status(200).json({ success: true, user: responseObject });
}));
