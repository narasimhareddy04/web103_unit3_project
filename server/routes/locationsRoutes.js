import express from "express";
// Importing the getLocations controller
import {
  getLocationById,
  getLocations,
} from "../controllers/locationsController.js";

const router = express.Router();

// Define the route to get locations
router.get("/locations", getLocations);
router.get("/locations/:id", getLocationById);

export default router;
