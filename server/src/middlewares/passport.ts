import * as passport from "passport";
import type { Request, Response, NextFunction } from "express";

/**
 * Authenticate Middleware
 */
export const authenticate = () =>
  passport.authenticate("local", { session: false });

/**
 * Protect Middleware
 */
export const protect = () => passport.authenticate("jwt", { session: false });
