import mongoose from "mongoose";
import dotenv from "dotenv";

/* DOTENV CONFIGURATION */
dotenv.config();

/* CONFIGURATION */
mongoose.set("strictQuery", true);

/* DB CONNECTION */
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Database connected!"));
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
