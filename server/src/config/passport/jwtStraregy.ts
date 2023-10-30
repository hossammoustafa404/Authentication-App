import * as JwtStrategy from "passport-jwt";
import type { StrategyOptions, VerifyCallback } from "passport-jwt";
import config from "../config";
import { getUserService } from "../../services/users";

const options: StrategyOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.accessToken.secret,
};

const verifyCb: VerifyCallback = async (payload, done) => {
  const { userId } = payload;

  const { user } = await getUserService(userId);

  return done(null, user);
};

const jwtStrategy = new JwtStrategy.Strategy(options, verifyCb);

export default jwtStrategy;
