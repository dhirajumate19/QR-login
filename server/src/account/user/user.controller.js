import {
  decodeToken,
  generateToken,
} from "../../../services/JWT/jwt.service.js";
import {
  failedResponse,
  successResponse,
} from "../../../utils/responses/response.js";
import { authenticateUser, userModel } from "./user.model.js";

export const userSignupController = async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send(failedResponse(400, "Email already exists"));
    }

    // Create a new user instance
    const newUser = new userModel(req.body);

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a success response
    res.send(successResponse(savedUser, "Signup successful"));
  } catch (error) {
    console.error(error);
    // Send an error response
    res
      .status(500)
      .send(failedResponse(500, "Unable to create user at this moment"));
  }
};
export const userSigninController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);
    console.log("user", user.data);
    if (!user.data) {
      return res.send(failedResponse(403, "Login failed"));
    }
    const userToken = generateToken({ userId: user._id });
    res.status(201).send(successResponse(userToken, "Login Successfull"));
  } catch (error) {}
};
