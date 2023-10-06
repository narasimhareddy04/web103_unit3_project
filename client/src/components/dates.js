// dates.js
export const formatTime = (time) => {
  // Check if time is defined and is a string
  if (typeof time !== "string") {
    console.error("Invalid time format. Expected a string in HH:MM format.");
    return time;
  }
  // Assume time is in 24-hour format "HH:MM" and convert it to "HH:MM AM/PM"
  let [hour, minute] = time.split(":");
  let ampm = +hour < 12 ? "AM" : "PM";
  hour = +hour % 12 || 12; // Convert hour to 12-hour format
  return `${hour}:${minute} ${ampm}`;
};

export const formatRemainingTime = (remainingTime) => {
  // Ensure remainingTime is a number
  if (typeof remainingTime !== "number") {
    console.error("Invalid time remaining. Expected a number.");
    return remainingTime;
  }
  // Assume remainingTime is in minutes and convert it to "HH hours MM minutes"
  const hours = Math.floor(remainingTime / 60);
  const minutes = remainingTime % 60;
  return `${hours} hours ${minutes} minutes`;
};

export const formatNegativeTimeRemaining = (remaining, id) => {
  // Ensure remaining is a number
  if (typeof remaining !== "number") {
    console.error("Invalid time remaining. Expected a number.");
    return;
  }
  // If remaining time is negative, log a message with the event id
  if (remaining < 0) {
    console.log(`Event with id ${id} has already started`);
  }
};
