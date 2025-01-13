import express from "express";
import MyHotelsController from "../controllers/MyHotelsController";
import verifyToken from "../middlewares/auth";
import { validateMyHotelRequest } from "../middlewares/validation";
import { upload } from "../config/multer";

const router = express.Router();

// api/my-hotels
router.post(
  "/",
  upload.array("imageFiles", 6),
  validateMyHotelRequest,
  verifyToken,
  MyHotelsController.createNewHotel,
);

router.get("/", verifyToken, MyHotelsController.getAllHotels);

router.get("/:id", verifyToken, MyHotelsController.getHotelById);

router.put(
  "/:hotelId",
  upload.array("imageFiles"),
  verifyToken,
  MyHotelsController.updateHotelInfoById,
);

export default router;
