import express from "express";
import "./config/dotenv.js";
import cors from "cors";
import eventsRouter from "./routes/eventsRoutes.js";
import locationsRouter from "./routes/locationsRoutes.js";
import path from "path";
import favicon from "serve-favicon";
import dotenv from "dotenv";

// import the router from your routes file

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(favicon(path.resolve("../", "client", "public", "party.png")));
} else if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.resolve("public", "party.png")));
  app.use(express.static("public"));
}

// specify the api path for the server to use

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) => res.sendFile(path.resolve("public", "index.html")));
}
// Use the routers
app.use("/api", eventsRouter);
app.use("/api", locationsRouter);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
