import mongoose from "mongoose";

const QRSchema = mongoose.Schema(
  {
    sessionId: { type: String, required: [true, "Session ID Required"] },
    validUpto: { type: Number, required: true },
    isExpiration: { type: Boolean, required: true },
    ipAddress: { type: String, required: true },
    hostName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const QRModel = mongoose.model("QRCode", QRSchema);
