import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config({ path: "./.env" });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/subscribe", subscriptionRoutes);

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
