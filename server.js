import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // load .env first

// ✅ initialize express app first before using it
const app = express();

// ✅ middlewares
app.use(cors());
app.use(express.json());

// ✅ connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ sample route
app.get("/", (req, res) => {
  res.send("Notes API is running...");
});

// ✅ start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
