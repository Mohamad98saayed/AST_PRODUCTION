import cloudinary from "cloudinary";
import dotenv from "dotenv";

/* IMPORTS FROM MOPDELS */
import User from "../models/user.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwt.js";

/* CONFIGURE DOTENV */
dotenv.config();

// POST => signup a new user => /api/v1/user/signup
export const signup = catchAsync(async (req, res, next) => {
  // check if body.image is truthy value
  const uploadedImage = req?.body?.image
    ? await cloudinary.v2.uploader.upload(req?.body?.image, {
        folder: "users",
        width: 150,
        crop: "scale",
      })
    : null;

  //distructure the fields from the body
  const { name, email, password } = req.body;

  // create the user
  const user = await User.create({
    name,
    email,
    password,
    image: {
      publicId: uploadedImage?.public_id || process.env.DEFAULT_USER_IMAGE_ID,
      url: uploadedImage?.secure_url || process.env.DEFAULT_USER_IMAGE,
    },
  });

  sendToken(user, 201, res);
});

// POST => signin a user => /api/v1/user/signin
export const signin = catchAsync(async (req, res, next) => {
  // distructure the fields from the body
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password)
    return next(new ErrorHandler("Please enter email & password!", 400));

  // check if email already in db
  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("Invalid email or password!", 400));

  // check if password is correct
  const isPasswordsMatches = await user.comparePassword(password);

  if (!isPasswordsMatches)
    return next(new ErrorHandler("Invalid email or password!", 400));

  sendToken(user, 201, res);
});

// GET => signout a user => /api/v1/user/signout
export const signout = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// GET => get current user => /api/v1/user/current
export const getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userID);

  sendToken(user, 200, res);
});
