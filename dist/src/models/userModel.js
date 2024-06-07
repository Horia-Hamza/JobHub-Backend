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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const authentication_1 = require("../../common/src/services/authentication");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    role: {
        type: String,
        enum: ['User', 'Admin']
    },
    jobs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
});
userSchema.pre("save", function (done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password') || this.isNew) {
            const hashedPwd = yield authentication_1.authService.pwdToHash(this.get("password"));
            this.set('password', hashedPwd);
        }
        done();
    });
});
userSchema.statics.build = (createUserDto) => {
    return new exports.UserModel(createUserDto);
};
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
