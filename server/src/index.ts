import "reflect-metadata";
import * as express from "express";
import "express-async-errors";
import config from "./config/config";
import errorHandler from "./middlewares/errorHandler";
import * as cors from "cors";
import helmet from "helmet";
import appRouter from "./routes";
import { connectDB } from "./config/db";
import passportFn from "./config/passport";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

const allowedOrigins = [config.client.baseUrl, "http://localhost:3000"];
const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    if (allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(Error("Origin is blocked by cors policy"), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: StatusCodes.OK,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1", appRouter);

// passport
passportFn();
passport.initialize();

// Global Error Handler Middleware
app.use(errorHandler);

const start = async () => {
  const port = config.app.port;

  await connectDB();

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};
start();
