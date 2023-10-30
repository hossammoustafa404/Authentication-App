// Imports
import * as express from "express";
import {
  createUser,
  deleteUser,
  getManyUsers,
  getUser,
  updateUser,
} from "../controllers/users";
import validate from "../middlewares/validate";
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from "../validators/users";
import restrictedTo from "../middlewares/restrictedTo";
import { protect } from "../middlewares/passport";

const router = express.Router();

router
  .route("/")
  .post(
    validate(createUserValidator),
    protect(),
    restrictedTo("super_admin"),
    createUser
  )
  .get(protect(), getManyUsers);

router
  .route("/:userId")
  .get(validate(getUserValidator), getUser)
  .patch(protect(), validate(updateUserValidator), updateUser)
  .delete(
    validate(deleteUserValidator),
    protect(),
    restrictedTo("super_admin"),
    deleteUser
  );

export default router;
