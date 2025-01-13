import express from "express";
import { validateMyUserLoginRequest } from "../middlewares/validation";
import AuthController from "../controllers/AuthController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/validate-token", verifyToken, AuthController.validateToken);

router.post(
  "/login",
  validateMyUserLoginRequest,
  AuthController.loginCurrentUser,
);

router.post("/logout", AuthController.logoutCurrentUser);

export default router;
