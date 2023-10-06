import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import * as EventsAPI from "../services/EventsAPI";
import * as LocationsAPI from "../services/LocationsAPI";
import { useParams } from "react-router-dom";
import "../css/LocationEvents.css";

const LocationEvents = () => {
  const { id } = useParams();
  const [location, setLocation] = useState({});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndEvents = async () => {
      try {
        const locationData = await LocationsAPI.getLocationById(id);
        const eventsData = await EventsAPI.getAllEventsByLocationId(id);
        setLocation(locationData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndEvents();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image_url} alt={location.name} />
        </div>
        <div className="location-info">
          <h2>{location.name}</h2>
          <p>{location.description}</p>
        </div>
      </header>
      <main>
        {events && events.length > 0 ? (
          events.map((event) => (
            <Event
              key={event.id}
              title={event.title}
              date={event.event_date}
              image={event.image}
            />
          ))
        ) : (
          <h2>No events scheduled at this location yet!</h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
