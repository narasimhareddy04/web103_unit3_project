import React, { useState, useEffect } from "react";
import * as LocationsAPI from "../services/LocationsAPI";
import "../css/Locations.css";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsData = await LocationsAPI.getAllLocations();
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="locations-container">
      <h1>Locations</h1>
      <div className="locations-list">
        {locations.map((location, index) => (
          <div key={index} className="location-item">
            <img
              src={location.image_url}
              alt={location.name}
              className="location-image"
            />
            <h2 className="location-title">
              <a href={`/location/${location.id}`} className="location-link">
                {location.name}
              </a>
            </h2>
            <p className="location-description">{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
