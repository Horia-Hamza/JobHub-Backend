"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    workPlace: {
        type: String,
        default: "on-site",
        enum: ["on-site", "hybrid", "remote"],
        required: true,
    },
    careerLevel: {
        type: String,
        default: "experienced",
        enum: ["entry-level", "experienced", "not-specified"],
        // required: true,
    },
    jobType: {
        type: String,
        default: "full-time",
        enum: ["full-time", "part-time", "work-from-home"],
        // required: true,
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    applications: [
        {
            appliedBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            userApplication: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Application",
            },
        },
    ],
    applicationsNumber: { type: Number, default: 0 },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "can not add job without Admin"],
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true // Add timestamps option
});
JobSchema.index({ 'applications.appliedBy': 1 }, { unique: false }); // Remove uniqueness constraint
JobSchema.statics.build = (createJobDto) => new JobModel(createJobDto);
const JobModel = mongoose_1.default.model("Job", JobSchema);
exports.default = JobModel;
