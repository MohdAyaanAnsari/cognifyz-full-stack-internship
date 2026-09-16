import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import formRoutes from "./routes/form.js";

dotenv.config();

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task 6 Backend API is running.",
  });
});


// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/form", formRoutes);


// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});


// ==========================================
// DATABASE + SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT}`
      );
    });

  } catch (error) {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();