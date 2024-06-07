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
exports.createApplicationRouter = void 0;
const applicationModel_1 = __importDefault(require("../../models/applicationModel"));
const applicationModel_2 = __importDefault(require("../../models/applicationModel"));
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.createApplicationRouter = router;
router.post("/job/:jobId/submit-application/user/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId, jobId } = req.params;
    if (((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id) !== userId) {
        return next(new bad_request_1.BadRequestError("can not apply for jobs!"));
    }
    const job = applicationModel_2.default.findById(jobId);
    if (!job) {
        return next(new bad_request_1.BadRequestError("can not find job!"));
    }
    const { userName, coverLetter } = req.body;
    if (!userName || !userId || !jobId || !coverLetter) {
        return next(new bad_request_1.BadRequestError("missing inputs!"));
    }
    const newApplication = applicationModel_1.default.build({
        userName,
        userId,
        jobId,
        coverLetter,
    });
    yield newApplication.save();
    res.status(200).json({ succuss: true, newApplication });
}));
