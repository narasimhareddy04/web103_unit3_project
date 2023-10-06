import express from "express";
// Importing the getEvents controller
import {
  getEvents,
  getEventsById,
  getAllEventsByLocationId,
} from "../controllers/eventsController.js";

const router = express.Router();

// Define the route to get events
router.get("/events", getEvents);
router.get("/events/:id", getEventsById);
router.get("/events/location/:id", getAllEventsByLocationId);

export default router;
