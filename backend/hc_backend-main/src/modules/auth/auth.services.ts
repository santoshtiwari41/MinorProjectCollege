import jwt from "jsonwebtoken";
import crypto from "node:crypto";

import config from "../../configs/constants";

export const generateTokens = async (payload: { id: number }) => {
  const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
  const refreshToken = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

export const generateOtp = async (length = 6, minutes = 5) => {
  const otp = crypto
    .randomInt(0, Math.pow(10, length))
    .toString()
    .padStart(length, "0");

  const now = new Date();
  const expiryTime = new Date(now.getTime() + minutes * 60000);
  return {
    otp: parseInt(otp),
    expiryTime,
  };
};
