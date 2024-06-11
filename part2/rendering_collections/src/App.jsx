import { useEffect, useState } from "react";
import axios from "axios";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

import Note from "./components/Note";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };
  useEffect(hook, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((notesChanged) => {
        setNotes(notes.map((n) => (n.id !== id ? n : notesChanged)));
      })
      .catch((error) => {
        setErrorMessage(`Note ${note.content} was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
          console.log("error");
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: (notes.length + 1).toString(),
    };
    noteService.create(noteObject).then((newNotes) => {
      setNotes(notes.concat(newNotes));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  const doDeleteNote = (id) => {
    console.log(`${id}`);
    noteService
      .doDelete(id)
      .then((data) => {
        console.log(data);
        setNotes(notes.filter((n) => n.id !== data.id));
      })
      .catch((error) => {
        setErrorMessage(`Note was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
          console.log("error");
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  if (!notes) {
    return <h1>CANNOT TALK TO SERVER</h1>;
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification TheMessage={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "Important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNotes={() => doDeleteNote(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit"> save</button>
      </form>

      <Footer />
    </div>
  );
};

export default App;
