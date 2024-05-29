import jwt from "jsonwebtoken";
import { ACCESS_EXP_IN, JWT_PWD, REFRESH_EXP_IN } from "./jwt.config.js";

// Function to generate access and refresh tokens
export const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, JWT_PWD, { expiresIn: ACCESS_EXP_IN });
  const refreshToken = jwt.sign(payload, JWT_PWD, {
    expiresIn: REFRESH_EXP_IN,
  });
  return { accessToken, refreshToken };
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
