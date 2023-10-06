// EventsAPI.jsx
import axios from "axios";

const baseUrl = "http://localhost:3000/api/events";

export const getAllEvents = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};

export const getEventsById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const apiUrl = "http://localhost:3000/api/events";

export const getAllEventsByLocationId = async (locationId) => {
  try {
    const response = await axios.get(`${apiUrl}/location/${locationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
