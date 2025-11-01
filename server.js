import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
app.use("/api/notes", noteRoutes);


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => res.send("Notes API Running"));

app.listen(process.env.PORT, () => console.log(`🚀 Server on port ${process.env.PORT}`));
