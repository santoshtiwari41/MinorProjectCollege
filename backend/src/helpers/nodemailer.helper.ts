import nodemailer from "nodemailer";

import config from "../configs/constants";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.n_email,
    pass: config.n_pass,
  },
});

const sendMail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: config.n_email,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email: " + error);
  }
};
export default sendMail;
