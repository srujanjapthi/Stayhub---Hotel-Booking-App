import express from "express";
import HotelsController from "../controllers/HotelsController";
import { validateHotelRequest } from "../middlewares/validation";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/search", HotelsController.searchHotels);

router.get("/", HotelsController.getAllHotelsSortedByLastUpdated);

router.get("/:id", validateHotelRequest, HotelsController.getHotelById);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  HotelsController.createBookingPaymentIntent,
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  HotelsController.createHotelBooking,
);

export default router;
