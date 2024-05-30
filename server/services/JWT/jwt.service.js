import jwt from "jsonwebtoken";
import { ACCESS_EXP_IN, JWT_PWD, REFRESH_EXP_IN } from "./jwt.config.js";
import { userTokenModel } from "./jwt.model.js";

// Function to generate access and refresh tokens
export const generateToken = async (payload) => {
  try {
    if (!payload.userId) {
      throw new Error("Missing required Enviornment Variable");
    }
    const accessToken = jwt.sign(payload, JWT_PWD, {
      expiresIn: ACCESS_EXP_IN,
    });
    const refreshToken = jwt.sign(payload, JWT_PWD, {
      expiresIn: REFRESH_EXP_IN,
    });

    const userTokenData = await userTokenModel.findOne({
      userId: payload.userId,
    });
    if (!userTokenData) {
      const newUserTokenData = {
        userId: payload.userId,
        accessToken: [accessToken],
        refreshToken: [refreshToken],
      };
      const userToken = new userTokenModel(newUserTokenData);
      await userToken.save();
      return { accessToken, refreshToken };
    }

    userTokenData.accessToken.push(accessToken);
    userTokenData.refreshToken.push(refreshToken);
    await userTokenData.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error while generating token:", error);
    return { error: "Error while generating token" };
  }
};

// Function to validate a token
export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_PWD);
    return { valid: true, expired: false, decoded };
  } catch (err) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
};

// Function to regenerate an access token using a refresh token
export const reGenerateToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_PWD);
    const newAccessToken = jwt.sign({ id: decoded.id }, JWT_PWD, {
      expiresIn: ACCESS_EXP_IN,
    });
    return { newAccessToken, valid: true };
  } catch (err) {
    return { valid: false, message: err.message };
  }
};

// Function to simulate destroying a token (usually involves blacklisting)
export const destroyToken = (token, tokenList) => {
  // tokenList is an array or a storage solution where invalid tokens are stored
  tokenList.push(token);
};

// Function to decode a token without verifying its signature
export const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    return { decoded, valid: true };
  } catch (err) {
    return { valid: false, message: err.message };
  }
};
