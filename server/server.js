import cloudinary from "cloudinary";
import app from "./app.js";
import connectDB from "./db.js";
import dotenv from "dotenv";

/* DOTENV CONFIGURATION */
dotenv.config();

/* HANDLE UNCAUGHT EXECPTIONS */
process.on("uncaughtException", (err) => {
  console.error(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exeption!");
  process.exit(1);
});

/* CLOUDINARY CONFIGURATION */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* LISTENING THE SERVER */
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectDB();
});

/* HANDLE UNHANDLED REJECTIONS */
process.on("unhandledRejection", (err) => {
  console.error(`ERROR: ${err.message}`);
  console.log("Shutting down server due to unhandled rejection!");
  process.exit(1);
});
