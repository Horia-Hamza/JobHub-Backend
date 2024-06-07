"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next();
    }
    try {
        const payLoad = (jsonwebtoken_1.default.verify(authorization, process.env.JWT_KEY));
        req.currentUser = payLoad;
    }
    catch (error) {
        console.error('JWT Verification Error:', error);
        return next();
    }
    next();
};
exports.currentUser = currentUser;
