import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";

/* IMPORT ROUTERS */
import userRouter from "./routes/user.js";
import carRouter from "./routes/car.js";

/* DOTENV CONFIGURATION */
dotenv.config();

/* IMPORT ERROR MIDDLEWARE */
import errorMiddleware from "./middlewares/error.js";

/* CREATING THE APP */
const app = express();

/* CONFIGURATIONS */
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(fileUpload());

/* MOUNT THE ROUTERS */
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cars", carRouter);

app.use(errorMiddleware);

export default app;
