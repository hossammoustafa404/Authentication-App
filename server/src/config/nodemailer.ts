import * as nodermailer from "nodemailer";
import config from "./config";

const transporter = nodermailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: config.nodemailer.user,
    pass: config.nodemailer.password,
  },
});

export default transporter;
