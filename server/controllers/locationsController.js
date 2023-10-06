// Importing pool from database.js
import { pool } from "../config/database.js";

// Function to get all locations from the locations table
export const getLocations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM locations");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Additional location handling functions can go here

// Function to get single location from the locations table

export const getLocationById = async (req, res) => {
  try {
    // Extracting ID from request parameters
    const { id } = req.params;

    // Validating ID - ensuring it's a number
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "Invalid ID format. ID must be a number." });
    }

    // Parameterized query to avoid SQL injection
    const result = await pool.query("SELECT * FROM locations WHERE id = $1", [
      id,
    ]);

    // Handling case where no location was found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Location not found." });
    }

    // Sending the found location
    res.status(200).json(result.rows[0]);
  } catch (error) {
    // Logging the error and sending a 500 status code
    console.error("Error fetching location:", error.message);
    res.status(500).json({ error: error.message });
  }
};
