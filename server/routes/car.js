import express from "express";
import {
  createCar,
  getAllCars,
  getOneCar,
  updateCar,
  deleteCar,
} from "../controllers/car.js";
import { isAuthenticated } from "../middlewares/auth.js";

/* CREATE A NEW ROUTER */
const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getOneCar);
router.post("/", isAuthenticated, createCar);
router.put("/:id", isAuthenticated, updateCar);
router.delete("/:id", isAuthenticated, deleteCar);

export default router;
