import React from "react";
import "../css/Event.css";

const Event = ({ title, date, image }) => {
  return (
    <article className="event-information">
      <img src={image} alt={title || "Event"} />
      <div className="event-information-overlay">
        <div className="text">
          <h3>{title}</h3>
          <p>{date}</p>
        </div>
      </div>
    </article>
  );
};

export default Event;
