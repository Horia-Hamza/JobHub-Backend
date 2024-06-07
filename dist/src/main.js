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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const signup_1 = require("../src/routers/auth/signup");
const login_1 = require("../src/routers/auth/login");
const logout_1 = require("../src/routers/auth/logout");
const current_user_1 = require("../src/routers/auth/current-user");
const current_user_2 = require("../common/src/middleware/current-user");
const require_auth_1 = require("../common/src/middleware/require-auth");
const index_1 = require("../common/src/index");
const create_category_1 = require("../src/routers/category/create-category");
const get_categories_1 = require("../src/routers/category/get-categories");
const create_job_1 = require("../src/routers/job/create-job");
const update_job_1 = require("../src/routers/job/update-job");
const delete_job_1 = require("../src/routers/job/delete-job");
const delete_category_1 = require("../src/routers/category/delete-category");
const get_job_by_id_1 = require("../src/routers/job/get-job-by-id");
const get_jobs_1 = require("../src/routers/job/get-jobs");
const submit_application_1 = require("../src/routers/application/submit-application");
const update_application_1 = require("../src/routers/application/update-application");
const users_1 = require("../src/routers/auth/users");
const get_application_1 = require("../src/routers/application/get-application");
const all_applications_1 = require("../src/routers/application/all-applications");
const current_user_applications_1 = require("../src/routers/application/current-user-applications");
const app = (0, express_1.default)();
app.set("trust proxy", true);
app.use(express_1.default.json());
const corsOptions = {
    origin: "http://localhost:3000" || "*",
    optionsSuccessStatus: 200,
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false,
}));
app.use(get_jobs_1.findJobsRouter);
app.use(get_categories_1.findCategoriesRouter);
app.use(get_job_by_id_1.findJobByIdRouter);
app.use(signup_1.signupRouter);
app.use(login_1.loginRouter);
app.use(current_user_2.currentUser);
app.use(current_user_1.currentUserRouter);
app.use(require_auth_1.requireAuth, users_1.findUsersRouter);
app.use(logout_1.logoutRouter);
app.use(require_auth_1.requireAuth, create_job_1.createJobRouter);
app.use(require_auth_1.requireAuth, update_job_1.updateJobRouter);
app.use(require_auth_1.requireAuth, delete_job_1.deleteJobRouter);
app.use(require_auth_1.requireAuth, delete_category_1.deleteCategoryRouter);
app.use(require_auth_1.requireAuth, create_category_1.createCategoryRouter);
app.use(require_auth_1.requireAuth, submit_application_1.submitApplicationRouter);
app.use(require_auth_1.requireAuth, update_application_1.updateApplicationRouter);
app.use(require_auth_1.requireAuth, get_application_1.getApplicationRouter);
app.use(require_auth_1.requireAuth, all_applications_1.allApplicationsRouter);
app.use(require_auth_1.requireAuth, current_user_applications_1.currentUserApplications);
app.use("*", (req, res, next) => {
    next(new index_1.NotFoundError());
});
app.use(index_1.errorHandler);
const db_URI = process.env.mongo_URI;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_KEY)
        throw new Error("JWT_KEY is required");
    if (!db_URI)
        throw new Error("mongo_URI is required");
    try {
        yield mongoose_1.default.connect(db_URI);
        console.log(`connect successfully to ...... ${db_URI}`);
    }
    catch (error) {
        throw new Error("catch error like bad connection!");
    }
});
app.listen(8080, () => {
    console.log("app is running on port........8080");
});
start();
