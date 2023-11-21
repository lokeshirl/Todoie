import { Router } from "express";
import {
  userLoginHandler,
  userSignupHandler,
} from "../controllers/user.controllers.js";

const userRouter = Router();

// POST :: create user :: signup user
userRouter.post("/signup", userSignupHandler);

// POST :: login user
userRouter.post("/login", userLoginHandler);

export default userRouter;
