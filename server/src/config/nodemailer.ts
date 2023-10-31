import * as nodermailer from "nodemailer";
import config from "./config";

const transporter = nodermailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    type: "login",
    user: config.nodemailer.user,
    pass: config.nodemailer.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
