import React, { useState, useEffect } from "react";
import * as EventsAPI from "../services/EventsAPI";
import "../css/Events.css";
import Event from "../components/Event"; // Importing the Event component

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await EventsAPI.getAllEvents();
        setEvents(allEvents);
      } catch (err) {
        setError(err);
        console.error("An error occurred while fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            // Utilizing the Event component for each event item
            <li key={event.id}>
              <Event
                title={event.title}
                date={event.date}
                image={event.image}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default Events;
