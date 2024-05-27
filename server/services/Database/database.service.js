import { connect } from "mongoose";
import { DATABASE_URL } from "./database.config.js";

export const connectionDB = async () => {
  try {
    await connect(DATABASE_URL);
    console.log("DB Connection is succesfull");
  } catch (error) {
    console.log("DB Connection is Failed");
  }
};
