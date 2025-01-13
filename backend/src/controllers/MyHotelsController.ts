import { Request, Response } from "express";
import Hotel from "../models/hotel";
import cloudinary from "cloudinary";
import { HotelType } from "../shared/types";

const createNewHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    // 1. Upload the images to cloudinary
    const imageUrls = await uploadImages(imageFiles);

    // 2. If upload was successful, add the URLs to the new hotel
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    // 3. Save the new hotel in our database
    const hotel = new Hotel(newHotel);

    await hotel.save();

    // 4. Return a 201 status
    res.status(201).send(hotel);
  } catch (error: any) {
    console.log("Error creating hotel:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching hotels",
    });
  }
};

const getHotelById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    res.json(hotel);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching hotels",
    });
  }
};

const updateHotelInfoById = async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;

    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true },
    );

    if (!hotel) {
      res.status(404).json({
        message: "Hotel not found",
      });

      return;
    }

    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();

    res.status(201).json(hotel);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image): Promise<string> => {
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    return uploadResponse.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};

export default {
  createNewHotel,
  getAllHotels,
  getHotelById,
  updateHotelInfoById,
};
