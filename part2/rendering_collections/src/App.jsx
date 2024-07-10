import { useEffect, useState } from "react";
import axios from "axios";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";

import Note from "./components/Note";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };
  useEffect(hook, []);
  const hookUserStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  };
  useEffect(hookUserStorage, []);

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
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();
    console.log("user", user);
    console.log("userId", user.id);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      userId: user.id,
    };
    noteService
      .create(noteObject)
      .then((newNotes) => {
        setNotes(notes.concat(newNotes));
        setNewNote("");
      })
      .catch((error) => {
        setErrorMessage(`${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
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
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 500);
    }
  };
  if (!notes) {
    return <h1>CANNOT TALK TO SERVER</h1>;
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
        <br />
        <br />
      </div>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification TheMessage={errorMessage} />
      {/* Button for toggling important or not */}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username}</p>
          {noteForm()}
        </div>
      )}
      <br />
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
      <Footer />
    </div>
  );
};

export default App;
