import mongoose from "mongoose";

const userTokenSchema = mongoose.Schema({
  userId: { type: String, required: [true, "Unique ID required"] },
  accessToken: {
    type: [String],
    required: [true, "Access tokens are required"],
  },
  refreshToken: {
    type: [String],
    required: [true, "Refresh tokens are required"],
  },
});
export const userTokenModel = mongoose.model("UserToken", userTokenSchema);
