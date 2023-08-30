import cloudinary from "cloudinary";
import dotenv from "dotenv";

/* IMPORTS FROM MOPDELS */
import Car from "../models/car.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";
import APIFeatures from "../utils/apiFeatures.js";

/* DOTENV CONFIGURATION */
dotenv.config();

// GET      => get all cars      => /api/v1/cars
export const getAllCars = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Car.find(), req.query)
    .search()
    .filter()
    .pagination(process.env.CARS_PER_PAGE);

  let cars = await apiFeatures.query;

  res.status(200).json({
    success: true,
    cars,
  });
});

// GET      => get one car       => /api/v1/cars/:id
export const getOneCar = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) return next(new ErrorHandler("Car not found!", 404));

  res.status(200).json({
    success: true,
    car,
  });
});

// POST     => create a new car  => /api/v1/cars
export const createCar = catchAsync(async (req, res, next) => {
  // check if user uploded at least one photo
  if (!req.body.images || req.body.images.length === 0) {
    return next(
      new ErrorHandler(
        "Please you are required to upload at least one image!",
        400
      )
    );
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "cars",
    });

    imagesLinks.push({
      publicId: result.public_id,
      url: result.secure_url,
    });
  }

  await Car.create({
    ...req.body,
    images: imagesLinks,
    user: req.userID,
  });

  res.status(201).json({
    success: true,
    message: "Car created successfully!",
  });
});

// PUT      => update car        => /api/v1/cars/:id
export const updateCar = catchAsync(async (req, res, next) => {
  let car = await Car.findById(req.params.id);

  if (!car) {
    return next(new ErrorHandler("Car not found", 404));
  }

  // check if the car belongs to the current user
  if (car.user.id !== req.userID) {
    return next(new ErrorHandler("You cannot perform this action!", 401));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images.length) {
    // Deleting images associated with the product
    for (let i = 0; i < car.images.length; i++) {
      await cloudinary.v2.uploader.destroy(car.images[i].publicId);
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "cars",
      });

      imagesLinks.push({
        publicId: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  !images.length && delete req.body.images;

  car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Car updated successfully!",
  });
});

// DELETE   => delete car        => /api/v1/cars/:id
export const deleteCar = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) return next(new ErrorHandler("Car not found!", 404));

  // check if the car belongs to the current user
  if (car.user.id !== req.userID) {
    return next(new ErrorHandler("You cannot perform this action!", 401));
  }

  // Deleting images associated with the product
  for (let i = 0; i < car.images.length; i++) {
    await cloudinary.v2.uploader.destroy(car.images[i].publicId);
  }

  await car.deleteOne();

  res.status(201).json({
    success: true,
    message: "Car deleted succeffully!",
  });
});
