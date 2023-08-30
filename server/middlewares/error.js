import dotenv from "dotenv";

/* DOTENV CONFIGURATION */
dotenv.config();

/* CREATE ERROR MIDDLEWARE */
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // if dev env
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
};
