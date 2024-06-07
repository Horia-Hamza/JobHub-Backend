import mongoose from "mongoose";
import { categoryDoc } from "./categoryModel";
import { UserDoc } from "./userModel";

export interface JobDoc extends mongoose.Document {
  title: string;
  description: string;
  company: string;
  location: string;
  requirements: string;
  applicationsNumber?:number;
  applications?: Array<any>;
  createdBy: string;
  updatedBy?: string;
  categoryId: mongoose.Types.ObjectId;
  workPlace?:string;
  careerLevel?:string;
  jobType?:string;
}


export interface CreateJobDto {
  title: string;
  description: string;
  company: string;
  location: string;
  requirements: string;
  applicationsNumber?:number;
  applications?: Array<any>;
  createdBy: string;
  updatedBy?: string;
  categoryId: mongoose.Types.ObjectId;
  workPlace:string;
  careerLevel:string;
  jobType:string;
}

export interface JobModel extends mongoose.Model<JobDoc> {
  build(dto: CreateJobDto): JobDoc;
}

const JobSchema = new mongoose.Schema({
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
  categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  applications: [
    {
      appliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      userApplication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    },
  ],
  applicationsNumber:{type:Number,default:0},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "can not add job without Admin"],
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{
  timestamps: true // Add timestamps option
}
);

JobSchema.index({ 'applications.appliedBy': 1 }, { unique: false }); // Remove uniqueness constraint

JobSchema.statics.build = (createJobDto: CreateJobDto) =>
  new JobModel(createJobDto);

const JobModel = mongoose.model<JobDoc, JobModel>("Job", JobSchema);

export default JobModel;
