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
exports.findCategoriesRouter = void 0;
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const router = (0, express_1.Router)();
exports.findCategoriesRouter = router;
router.get('/categories', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categoryModel_1.default.find();
    if (!categories) {
        return next(new bad_request_1.BadRequestError('can not find categories!'));
    }
    res.status(200).json({ succuss: true, categories });
}));
