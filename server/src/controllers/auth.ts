import type { Request, Response, CookieOptions } from "express";
import {
  forgetPasswordService,
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
  resetPasswordService,
  sendVerifyEmailService,
  verifyEmailService,
} from "../services/auth";
import { StatusCodes } from "http-status-codes";
import config from "../config/config";
import { SiteUser } from "../db/entities";

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: config.jwt.refreshToken.expiresIn,
};
/**
 * Register Controller
 * @param {Request} req
 * @param {Response} res
 */
export const register = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await registerService(req.body);

  return res
    .status(StatusCodes.CREATED)
    .cookie("refresh_token", refreshToken, refreshCookieOptions)
    .json({
      user,
      accessToken: accessToken,
    });
};

/**
 * Login Controller
 * @param {Request} req
 * @param {Response} res
 */
export const login = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await loginService(
    req?.user as SiteUser
  );

  res
    .status(StatusCodes.CREATED)
    .cookie("refresh_token", refreshToken, refreshCookieOptions)
    .json({
      user,
      accessToken: accessToken,
    });
};

/**
 * Refresh Token Controller
 * @param {Request} req
 * @param {Response} res
 */
export const refreshToken = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await refreshTokenService(
    req.cookies.refresh_token
  );

  res.clearCookie("refresh_token", refreshCookieOptions);
  return res
    .status(StatusCodes.OK)
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: config.jwt.refreshToken.expiresIn,
    })
    .json({ user, accessToken });
};

/**
 * Logout Controller
 * @param {Request} req
 * @param {Response} res
 */
export const logout = async (req: Request, res: Response) => {
  await logoutService(req.cookies.refresh_token);
  return res
    .status(StatusCodes.NO_CONTENT)
    .clearCookie("refresh_token", refreshCookieOptions)
    .end();
};

/**
 * Verify Email Controller
 * @param {Request} req
 * @param {Response} res
 */
export const verifyEmail = async (req: Request, res: Response) => {
  const { user } = await verifyEmailService(req.params.verifyToken);

  return res.status(StatusCodes.OK).json({ user });
};

/**
 * Send Verify Email Controller
 * @param {Request} req
 * @param {Response} res
 */
export const sendVerifyEmail = async (req: Request, res: Response) => {
  const { message } = await sendVerifyEmailService(req.user as SiteUser);
  return res.status(StatusCodes.OK).json({ message });
};

/**
 * Forget Password Controller
 * @param {Request} req
 * @param {Response} res
 */
export const forgetPassword = async (req: Request, res: Response) => {
  const { message } = await forgetPasswordService(req.query.email as string);
  return res.status(StatusCodes.OK).json({ message });
};

/**
 * Reset Password Controller
 * @param {Request} req
 * @param {Response} res
 */
export const resetPassword = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await resetPasswordService(
    req.params.resetToken,
    req.body
  );
  return res
    .status(StatusCodes.OK)
    .cookie("refresh_token", refreshToken, refreshCookieOptions)
    .json({ user, accessToken });
};
