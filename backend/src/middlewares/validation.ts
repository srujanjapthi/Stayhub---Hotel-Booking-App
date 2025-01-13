import { NextFunction, Request, RequestHandler, Response } from "express";
import { body, check, param, validationResult } from "express-validator";

const handleValidationErrors: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });

    return;
  }

  next();
};

export const validateMyUserRegisterRequest: RequestHandler[] = [
  check("firstName", "First name is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  handleValidationErrors,
];

export const validateMyUserLoginRequest: RequestHandler[] = [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  handleValidationErrors,
];

export const validateMyHotelRequest: RequestHandler[] = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Hotel type is required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price per night is required and must be a number"),
  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required"),
  handleValidationErrors,
];

export const validateHotelRequest: RequestHandler[] = [
  param("id").notEmpty().withMessage("Hotel ID is required"),
  handleValidationErrors,
];
