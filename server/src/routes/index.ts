import * as express from "express";
import usersRouter from "./users";
import authRouter from "./auth";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default router;
