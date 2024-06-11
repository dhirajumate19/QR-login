import express from "express";
import { QRController } from "./qr.controller.js";

const QRRouter = express.Router();

QRRouter.post("/qrcode", QRController);
export default QRRouter;
