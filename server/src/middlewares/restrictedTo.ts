import type { Request, Response, NextFunction } from "express";
import { SiteUser } from "../db/entities";
import { UnAuthorizedError } from "../lib/errors";

const restrictedTo =
  (...args: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user as SiteUser;
    if (args.includes(role)) {
      next();
    } else {
      throw new UnAuthorizedError(`Restricted to ${args.join(", ")}`);
    }
  };

export default restrictedTo;
