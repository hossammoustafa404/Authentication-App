import * as LocalStrategy from "passport-local";
// import type { DoneCallback } from "passport";
import { AppDataSource } from "../db";
import { SiteUser } from "../../entities";
// import { UnAuthorizedError } from "../../lib/errors";
import * as bcrypt from "bcrypt";
import { UnAuthorizedError } from "../../lib/errors";

const verifyCb = async (email: string, password: string, done: any) => {
  const userSiteRepo = AppDataSource.getRepository(SiteUser);
  const user = await userSiteRepo
    .createQueryBuilder()
    .select("*")
    .where("email = :email", { email })
    .getRawOne();

  if (!user) {
    return done(new UnAuthorizedError("Wrong email"), false);
  }

  const isPassMatch = await bcrypt.compare(password, user.password);

  if (!isPassMatch) {
    return done(new UnAuthorizedError("Wrong password"));
  }

  return done(null, user);
};

const localStrategy = new LocalStrategy.Strategy(
  { usernameField: "email" },
  verifyCb
);

export default localStrategy;
