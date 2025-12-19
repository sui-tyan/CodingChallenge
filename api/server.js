import app from "./app/app.js";
import connectDB from "./app/database/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

connectDB().then(
  () => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  },
  (reason) => {
    console.error("Failed to connect to the database:", reason);
  }
);
