import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  failedResponse,
  successResponse,
} from "../../../utils/responses/response.js";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // Name of the user, required field
    name: { type: String, required: true },

    // Email of the user, required field and must be unique
    email: { type: String, required: true, unique: true },

    // Password of the user, required field
    password: { type: String, required: true },

    // Phone number of the user, optional field
    phone: { type: Number, required: false },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Pre-save hook to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);

    // Proceed to save the user document
    next();
  } catch (err) {
    // Pass any errors to the next middleware
    next(err);
  }
});
userSchema.methods.comaprePassword = async function (password) {
  console.log("password", await bcrypt.compare(password, this.password));
  return await bcrypt.compare(password, this.password);
};

export const authenticateUser = async (email, password) => {
  try {
    const user = await userModel.findOne({ email });
    console.log("user", user);
    if (!user) {
      return failedResponse(400, "User not found");
    }

    const isMatch = await user.comaprePassword(password);
    console.log("match", isMatch);

    if (!isMatch) {
      return failedResponse(400, "Password does not match");
    }

    const response = {
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
      userPhone: user.phone,
    };
    return successResponse(response, "Password match");
  } catch (error) {
    console.log("err:", error);
    return failedResponse(403, "Unable to do authentication");
  }
};
// Create and export the User model based on the schema
export const userModel = mongoose.model("User", userSchema);
