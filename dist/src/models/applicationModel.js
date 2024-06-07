"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ApplicationSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    yearsOfExperience: {
        type: String,
    },
    expectedSalary: {
        type: String,
    },
    coverLetter: {
        type: String,
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    jobId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Job",
        required: [true, "can not place application without Job!"],
    },
    applicationStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"],
        required: true
    },
});
ApplicationSchema.statics.build = (createApplicationDto) => {
    // Ensure that jobId is converted to a mongoose.Types.ObjectId
    const applicationDtoWithObjectId = Object.assign(Object.assign({}, createApplicationDto), { jobId: new mongoose_1.default.Types.ObjectId(createApplicationDto.jobId) });
    return new Application(applicationDtoWithObjectId);
};
const Application = mongoose_1.default.model("Application", ApplicationSchema);
exports.default = Application;
