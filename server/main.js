import "dotenv/config";
import express from "express";
import { App_Port } from "./config.js";
import userRoutes from "./src/account/user/user.routes.js";
import { connectionDB } from "./services/Database/database.service.js";
import QRRouter from "./src/QR/qr.routes.js";

const app = express();

//middleware  used for parsing JSON request bodies
app.use(express.json());

//DataBase Connection
connectionDB();

//Routes
app.use("/api", userRoutes);
app.use("/api", QRRouter);

//liste port and start server
app.listen(App_Port, () => {
  console.log("The surver is ruuning on port number is", App_Port);
});
