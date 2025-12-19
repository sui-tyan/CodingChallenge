import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import formRoutes from "./routes/form_routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors({ methods: ["GET", "POST", "DELETE"] }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/forms", formRoutes);

export default app;
