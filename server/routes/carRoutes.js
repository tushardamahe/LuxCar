import express from "express";

import { protect } from "../middleware/auth.js";
import {
  addCarReview,
  getCarById,
  getCars,
  searchCars,
} from "../controllers/carController.js";

const carRouter = express.Router();

carRouter.get("/", getCars);
carRouter.get("/:id", getCarById);
carRouter.post("/:id/review", protect, addCarReview);
carRouter.post("/search", searchCars);

export default carRouter;
