import type { SendMailOptions } from "nodemailer";
import { SiteUser } from "../db/entities";
import transporter from "../config/nodemailer";
import config from "../config/config";

/**
 * Send Verify Mail
 * @param {User} user
 * @param {string} verifyToken
 */
export const sendVerifyMail = async (user: SiteUser, token: string) => {
  const mailOptions: SendMailOptions = {
    from: '"Amazing Store" <myname22744@hossam.com>',
    to: user.email,
    subject: "Verify your email...",
    html: `<p>Hello ${user.first_name}, verify your email by clicking this link:</p><br>
        <a href="${config.client.baseUrl}/verify-email/${token}">Verify Your Email</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

/**
 *
 * Send Reset Password Mail
 * @param {User} user
 * @param {string} token
 */
export const sendResetPassMail = async (user: SiteUser, token: string) => {
  const mailOptions: SendMailOptions = {
    from: '"Amazing Store" <myname22744@hossam.com>',
    to: user.email,
    subject: "Reset Your Password...",
    html: `<p>Hello ${user.first_name}, Reset your password by clicking this link:</p><br>
        <a href="${config.client.baseUrl}/reset-password/${token}">Reset Password</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};
