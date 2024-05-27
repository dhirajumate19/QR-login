import express from "express";
import { userSignupController } from "./user.controller.js";
import { validateUser } from "./user.validation.js";
const userRoutes = express.Router();
userRoutes.post("/signup", validateUser, userSignupController);
export default userRoutes;
