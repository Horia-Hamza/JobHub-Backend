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
exports.findJobsRouter = void 0;
const jobModel_1 = __importDefault(require("../../models/jobModel"));
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.findJobsRouter = router;
router.get("/jobs", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield jobModel_1.default.find().populate({
        path: "categoryId",
        select: "title",
    });
    if (!jobs) {
        return next(new bad_request_1.BadRequestError("can not find jobs!"));
    }
    res.status(200).json({ succuss: true, jobs });
}));
