const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, response) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === parseInt(id));
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  let thDeleted = notes.find((note) => note.id === id);
  if (!thDeleted) {
    return response.status(400).json({
      error: "Cannot find id in database",
    });
  }
  notes = notes.filter((note) => note.id !== id);
  response.status(200).json(thDeleted);
});
app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  let note = notes.find((note) => note.id === id);
  if (!note) {
    return res.status(400).json({
      error: "Cannot find id",
    });
  }

  const updatedNote = {
    ...note,
    content: body.content || note.content,
    important: body.important !== undefined ? body.important : note.important,
  };

  notes = notes.map((note) => (note.id === id ? updatedNote : note));

  res.json(updatedNote);
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "Missing Content",
    });
  }
  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
