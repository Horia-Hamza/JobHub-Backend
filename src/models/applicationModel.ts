import mongoose from "mongoose";

export interface ApplicationDoc extends mongoose.Document {
  email?: string;
  phone?: string;
  yearsOfExperience?: string;
  expectedSalary?: string;
  coverLetter?: string;
  userId?: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  applicationStatus?: string;
}

export interface CreateApplicationDto {
  email?: string;
  phone?: string;
  yearsOfExperience?: string;
  expectedSalary?: string;
  coverLetter?: string;
  userId?: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  applicationStatus?: string;
}

export interface ApplicationModel extends mongoose.Model<ApplicationDoc> {
  build(dto: CreateApplicationDto): ApplicationDoc;
}

const ApplicationSchema = new mongoose.Schema({
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
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  jobId: {
    type:mongoose.Types.ObjectId,
    ref: "Job",
    required: [true, "can not place application without Job!"],
  },
  applicationStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"],
    required:true
  },
});

ApplicationSchema.statics.build = (
  createApplicationDto: CreateApplicationDto
) => {
  // Ensure that jobId is converted to a mongoose.Types.ObjectId
  const applicationDtoWithObjectId: CreateApplicationDto = {
    ...createApplicationDto,
    jobId:new mongoose.Types.ObjectId(createApplicationDto.jobId),
  };

  return new Application(applicationDtoWithObjectId);
};

const Application = mongoose.model<ApplicationDoc, ApplicationModel>(
  "Application",
  ApplicationSchema
);

export default Application;
