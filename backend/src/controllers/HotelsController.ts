import { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse } from "../shared/types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const getHotelById = async (req: Request, res: Response) => {
  const id = req.params.id.toString();

  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching hotel",
    });
  }
};

const getAllHotelsSortedByLastUpdated = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated");
    res.json(hotels);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching hotels",
    });
  }
};

const searchHotels = async (req: Request, res: Response) => {
  try {
    const query = constructQuery(req.query);

    let sortOptions = {};

    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;

      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;

      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      (req.query.page ? req.query.page : "1").toString(),
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const createBookingPaymentIntent = async (req: Request, res: Response) => {
  // 1. Total cost
  // 2. Hotel Id
  // 3. User ID

  try {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      res.status(400).json({
        message: "Hotel not found",
      });

      return;
    }

    const totalCost = hotel.pricePerNight * numberOfNights * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost,
      currency: "inr",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      res.status(500).json({
        message: "Error creating payment intent",
      });

      return;
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalCost,
    };

    res.send(response);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const createHotelBooking = async (req: Request, res: Response) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string,
    );

    if (!paymentIntent) {
      res.status(400).json({
        message: "Payment Intent not found",
      });

      return;
    }

    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      res.status(400).json({
        message: "Payment intent mismatch",
      });

      return;
    }

    if (paymentIntent.status !== "succeeded") {
      res.status(400).json({
        message: `Payment Intent not succeeded. Status: ${paymentIntent.status}`,
      });

      return;
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      {
        $push: { bookings: newBooking },
      },
    );

    if (!hotel) {
      res.status(400).json({
        message: "Hotel not found",
      });

      return;
    }

    res.status(200).send(hotel);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const constructQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRating = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRating };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice.toString()),
    };
  }

  return constructedQuery;
};

export default {
  getAllHotelsSortedByLastUpdated,
  searchHotels,
  getHotelById,
  createBookingPaymentIntent,
  createHotelBooking,
};
