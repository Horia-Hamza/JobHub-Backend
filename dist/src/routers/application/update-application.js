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
exports.updateApplicationRouter = void 0;
const applicationModel_1 = __importDefault(require("../../models/applicationModel"));
const bad_request_1 = require("../../../common/src/errors/bad-request");
const express_1 = require("express");
const userModel_1 = require("../../models/userModel");
const router = (0, express_1.Router)();
exports.updateApplicationRouter = router;
router.put("/admin/update-application/:applicationId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { applicationId } = req.params;
    const { applicationStatus } = req.body;
    const admin = yield userModel_1.UserModel.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id);
    if ((admin === null || admin === void 0 ? void 0 : admin.role) === "User") {
        return next(new bad_request_1.BadRequestError("not allowed to show or edit application!"));
    }
    // const application =await ApplicationModel.findById(applicationId);
    // if (!application) {
    //   return next(new BadRequestError("can not find application!"));
    // }
    if (!applicationStatus || applicationStatus === '') {
        return next(new bad_request_1.BadRequestError("select application status!"));
    }
    const updatedApplication = yield applicationModel_1.default.findByIdAndUpdate(applicationId, {
        applicationStatus,
    }, { new: true });
    res.status(200).json({ succuss: true, updatedApplication });
}));
