import jwt from "jsonwebtoken";

/* FILES IMPORTS */
import User from "../models/user.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";

/* CHECKING IF USER IS AUTHENTICATED */
export const isAuthenticated = catchAsync(async (req, res, next) => {
  //getting the token from the cookie
  const { token } = req.cookies;

  //if no token return
  if (!token) {
    return next(
      new ErrorHandler("Not authenticated! Please login first.", 401)
    );
  }

  //decoding the token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  // pass the current user id into request
  req.userID = decodedToken.id;

  next();
});
