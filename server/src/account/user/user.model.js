import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

// Create and export the User model based on the schema
export const userModel = mongoose.model("User", userSchema);
