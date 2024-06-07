"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        enum: ["Accounting", "Engineering-Construction/Civil/Architecture", "Writing/Editorial", "IT/Software Development", "manufacturing/Production", "Quality", "Medical/Healthcare", "Customer Service/Support", "Business Development"],
        required: true,
        unique: true
    },
    jobs: [
        {
            job: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Job",
            }
        }
    ],
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "can not add category without Admin"],
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
// categorySchema.index({ 'categories.appliedBy': 1 }, { unique: false }); // Remove uniqueness constraint
categorySchema.statics.build = (createCategoryDto) => new categoryModel(createCategoryDto);
const categoryModel = mongoose_1.default.model("Category", categorySchema);
exports.default = categoryModel;
