import express from "express";
import {
  signup,
  signin,
  signout,
  getCurrentUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

/* CREATE A NEW ROUTER */
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", isAuthenticated, signout);
router.get("/current", isAuthenticated, getCurrentUser);

export default router;
