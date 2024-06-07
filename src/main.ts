import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cookieSession from "cookie-session";
import cors from "cors";

import { signupRouter } from "../src/routers/auth/signup";
import { loginRouter } from "../src/routers/auth/login";
import { logoutRouter } from "../src/routers/auth/logout";

import { currentUserRouter } from "../src/routers/auth/current-user";
import { currentUser } from "../common/src/middleware/current-user";
import { requireAuth } from "../common/src/middleware/require-auth";
import { NotFoundError, errorHandler } from "../common/src/index";

import { createCategoryRouter } from "../src/routers/category/create-category";
import { findCategoriesRouter } from "../src/routers/category/get-categories";

import { createJobRouter } from "../src/routers/job/create-job";
import { updateJobRouter } from "../src/routers/job/update-job";
import { deleteJobRouter } from "../src/routers/job/delete-job";
import { deleteCategoryRouter } from "../src/routers/category/delete-category";
import { findJobByIdRouter } from "../src/routers/job/get-job-by-id";
import { findJobsRouter } from "../src/routers/job/get-jobs";

import { submitApplicationRouter } from "../src/routers/application/submit-application";
import { updateApplicationRouter } from "../src/routers/application/update-application";
import { findUsersRouter } from "../src/routers/auth/users";
import { getApplicationRouter } from "../src/routers/application/get-application";
import { allApplicationsRouter } from "../src/routers/application/all-applications";
import { currentUserApplications } from "../src/routers/application/current-user-applications";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000" || "*",
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);


app.use(findJobsRouter);
app.use(findCategoriesRouter);

app.use(findJobByIdRouter);
app.use(signupRouter);
app.use(loginRouter);

app.use(currentUser);
app.use(currentUserRouter);
app.use(requireAuth,findUsersRouter)
app.use(logoutRouter);



app.use(requireAuth, createJobRouter);
app.use(requireAuth, updateJobRouter);
app.use(requireAuth, deleteJobRouter);
app.use(requireAuth, deleteCategoryRouter);

app.use(requireAuth, createCategoryRouter);

app.use(requireAuth, submitApplicationRouter);
app.use(requireAuth, updateApplicationRouter);
app.use(requireAuth, getApplicationRouter)
app.use(requireAuth, allApplicationsRouter)
app.use(requireAuth, currentUserApplications)

app.use("*", (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);
const db_URI = process.env.mongo_URI;
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required");
  if (!db_URI) throw new Error("mongo_URI is required");
  try {
    await mongoose.connect(db_URI);
    console.log(`connect successfully to ...... ${db_URI}`);
  } catch (error) {
    throw new Error("catch error like bad connection!");
  }
};

app.listen(8080, () => {
  console.log("app is running on port........8080");
});
start();
