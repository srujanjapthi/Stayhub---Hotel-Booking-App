import express from "express";
import MyUserController from "../controllers/MyUserController";
import { validateMyUserRegisterRequest } from "../middlewares/validation";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/me", verifyToken, MyUserController.getMyUserDetails);

router.post(
  "/register",
  validateMyUserRegisterRequest,
  MyUserController.registerCurrentUser,
);

export default router;
