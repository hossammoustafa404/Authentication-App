import config from "./config";
import * as nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

let transporterOptions: any;

if (config.app.env === "development") {
  transporterOptions = {
    service: "hotmail",
    auth: {
      user: config.outlook.user,
      pass: config.outlook.password,
    },
  };
} else if (config.app.env === "production") {
  transporterOptions = MailtrapTransport({
    token: config.mailtrap.apiToken,
  });
}

const transporter = nodemailer.createTransport(transporterOptions);

export default transporter;
