import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "secret",

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dmixhjrdn",
  api_key: process.env.CLOUDINARY_API_KEY || "333355372593743",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "DmrGv6HkJdI2L43RlTyKNjtvdPU",

  n_email: process.env.NODE_MAILER_EMAIL,
  n_pass: process.env.NODE_MAILER_PASSWORD,
};
const constants = Object.freeze(_config);

export default constants;
