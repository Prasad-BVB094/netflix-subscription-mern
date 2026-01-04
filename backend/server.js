import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Load environment variables
dotenv.config({ path: "./.env" });

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/subscribe", subscriptionRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
