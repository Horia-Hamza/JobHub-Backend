import { authService } from "../../common/src/services/authentication";
import { Schema, model, Document, Model } from "mongoose";
import {JobDoc} from './jobModel'
export interface UserDoc extends Document {
  name: string,
  email: string,
  password: string,
  token?: string,
  role: string,
  jobs?:Array<JobDoc>
}
export interface CreateUserDto {
  name: string,
  email: string,
  password: string,
  token?: string,
  role: string
}
export interface UserModel extends Model<UserDoc>{
build(dto: CreateUserDto): UserDoc
}
const userSchema = new Schema({
   name: {
      type: String,
      required: true,
    },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  role : {
   type: String,
   enum: ['User', 'Admin']
  },
  jobs: [
   {
    type: Schema.Types.ObjectId,
    ref: "Job" 
   }
   ],
});

userSchema.pre("save" , async function (done) {
  if (this.isModified('password')||this.isNew) {
    const hashedPwd = await authService.pwdToHash(this.get("password"))
    this.set('password', hashedPwd)
  }
  done()
})

userSchema.statics.build = (createUserDto: CreateUserDto)=>{
return new UserModel(createUserDto)
}

export const UserModel = model<UserDoc, UserModel>("User", userSchema);
