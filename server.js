import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Middleware (MUST be before routes)
app.use(cors());
app.use(express.json()); // allows reading JSON bodies (req.body)

// ✅ MongoDB connection (optional for now)
mongoose
  .connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("⚠️ MongoDB connection error:", err.message));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Notes API is running...");
});

// --------------------------------------
// 🧠 Temporary In-Memory Notes Data
// --------------------------------------
let notes = [
  { id: 1, title: "First note", content: "This is my first note" },
  { id: 2, title: "Second note", content: "This is my second note" },
];

// --------------------------------------
// 🚀 CRUD ROUTES
// --------------------------------------

// GET all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// GET one note by ID
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
});

// POST - create a new note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  // validate input
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title,
    content,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT - update a note
app.put("/api/notes/:id", (req, res) => {
  const { title, content } = req.body;
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) return res.status(404).json({ message: "Note not found" });

  if (title) note.title = title;
  if (content) note.content = content;

  res.json(note);
});

// DELETE - remove a note
app.delete("/api/notes/:id", (req, res) => {
  const noteIndex = notes.findIndex((n) => n.id === parseInt(req.params.id));

  if (noteIndex === -1) return res.status(404).json({ message: "Note not found" });

  notes.splice(noteIndex, 1);
  res.status(204).send();
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
