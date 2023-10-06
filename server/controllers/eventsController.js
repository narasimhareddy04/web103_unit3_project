// Importing pool from database.js
import { pool } from "../config/database.js";

// Function to get all events from the events table
export const getEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Additional event handling functions can go here

export const getEventsById = async (req, res) => {
  try {
    const { id } = req.params; // Extracting 'id' from the request parameters
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEventsByLocationId = async (req, res) => {
  try {
    // Extracting 'id' from the request parameters
    const { id } = req.params;

    // Validating ID - ensuring it's a number
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "Invalid ID format. ID must be a number." });
    }

    // Parameterized query to avoid SQL injection
    const result = await pool.query(
      "SELECT * FROM events WHERE location_id = $1",
      [id]
    );

    // Handling case where no events were found
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this location." });
    }

    // Sending the found events
    res.status(200).json(result.rows);
  } catch (error) {
    // Logging the error and sending a 500 status code
    console.error("Error fetching events:", error.message);
    res.status(500).json({ error: error.message });
  }
};
