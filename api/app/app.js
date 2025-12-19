import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./database/db.js";

import formRoutes from "./routes/form_routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors({ methods: ["GET", "POST", "DELETE"] }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/forms", formRoutes);
app.get("/health-check", (req, res) => {
  res.send("API is running...");
});

connectDB().then(
  () => {
    console.log("Connected to the database successfully");
  },
  (reason) => {
    console.error("Failed to connect to the database:", reason);
  }
);

export default app;
