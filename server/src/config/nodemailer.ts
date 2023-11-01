import config from "./config";
import * as nodermailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const transporter = nodermailer.createTransport(
  MailtrapTransport({
    token: config.mailtrap.apiToken,
  })
);

export default transporter;
