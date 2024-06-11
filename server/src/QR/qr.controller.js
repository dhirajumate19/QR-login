import {
  failedResponse,
  successResponse,
} from "../../utils/responses/response.js";
import { QRModel } from "./qr.mpdel.js";

export const QRController = async (req, res) => {
  try {
    const { sessionId, validUpto, isExpiration, ipAddress, hostName } =
      req.body;
    const newQRCode = new QRModel({
      sessionId,
      validUpto,
      isExpiration,
      ipAddress,
      hostName,
    });
    const response = await newQRCode.save();
    res.status(201).send(successResponse(response, "QR Genereted"));
  } catch (error) {
    console.log(error);
    res.status(500).send(failedResponse(500, "Internal Error"));
  }
};
