import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";   // <-- add this
import diamondRoutes from "./routes/diamondRoutes.js";

dotenv.config();
const app = express();

// ✅ Allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173", // allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/diamonds", diamondRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
