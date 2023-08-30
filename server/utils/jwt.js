import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/* DOTENV CONFIGURATION */
dotenv.config();

/* CREATE TOKEN */
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

/* SEND TOKEN */
const sendToken = (user, statusCode, res) => {
  const token = createToken(user.id);

  //cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //securing cookie on production mode
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  //remove password from output
  delete user.password;

  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    token,
    user,
  });
};

export default sendToken;
