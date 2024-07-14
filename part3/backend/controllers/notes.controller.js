const express = require("express");
const notesRouter = express.Router();

const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

require("express-async-errors");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });

  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.post("/", async (request, response) => {
  console.log(request.body);
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  console.log("decodedToken", decodedToken);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid Token" });
  }
  console.log(body.userId);
  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important === true ? true : false,
    user: user.id,
  });

  const savedNote = await note.save();

  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

notesRouter.delete("/:id", async (request, response) => {
  const result = await Note.findById(request.params.id);
  await Note.findByIdAndDelete(request.params.id);
  response.status(200).json(result).end();
});

notesRouter.put("/:id", (req, res, next) => {
  const { content, important } = req.body;

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
