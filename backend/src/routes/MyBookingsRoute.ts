import express from "express";
import verifyToken from "../middlewares/auth";
import MyBookingsController from "../controllers/MyBookingsController";

const router = express.Router();

router.get("/", verifyToken, MyBookingsController.getMyBookings);

export default router;
