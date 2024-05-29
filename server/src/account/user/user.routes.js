import express from "express";
import {
  userSigninController,
  userSignupController,
} from "./user.controller.js";
import { validateUser } from "./user.validation.js";
const userRoutes = express.Router();
userRoutes.post("/signup", validateUser, userSignupController);
userRoutes.post("/signin", userSigninController);
export default userRoutes;
