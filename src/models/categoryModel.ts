import mongoose from "mongoose";

export interface categoryDoc extends mongoose.Document {
  title: string;
  createdBy: string;
  updatedBy?: string;
  jobs?: Array<any> 

}

export interface CreateCategoryDto {
  title: string;
  createdBy: string;
  updatedBy?: string;
  jobs?:any
}

export interface categoryModel extends mongoose.Model<categoryDoc> {
  build(dto: CreateCategoryDto): categoryDoc;
}

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["Accounting", "Engineering-Construction/Civil/Architecture", "Writing/Editorial", "IT/Software Development", "manufacturing/Production", "Quality", "Medical/Healthcare", "Customer Service/Support", "Business Development"],
    required: true,
    unique:true
  },
 
  jobs: [
 {
  job:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  }
 }
],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "can not add category without Admin"],
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// categorySchema.index({ 'categories.appliedBy': 1 }, { unique: false }); // Remove uniqueness constraint

categorySchema.statics.build = (createCategoryDto: CreateCategoryDto) =>
  new categoryModel(createCategoryDto);

const categoryModel = mongoose.model<categoryDoc, categoryModel>("Category", categorySchema);

export default categoryModel;
