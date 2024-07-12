import { useEffect, useState, useRef, useReducer } from "react";
import axios from "axios";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";
import LoginForm from "./components/Login";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";

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
  const noteFormRef = useRef();

  //Login Implementation
  const [loginVisible, setLoginVisible] = useState(false);

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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
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
    console.log("calling");
    console.log(username);
    console.log(password);
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
    console.log("lah");
  };
  if (!notes) {
    return <h1>CANNOT TALK TO SERVER</h1>;
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification TheMessage={errorMessage} />
      {/* Button for toggling important or not */}

      {user === null ? (
        <Togglable buttonLabel="LOGIN">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>{user.username}</p>
          <Togglable buttonLabel="Add New Note" ref={noteFormRef}>
            <NoteForm createNote={addNote} userId={user.id} />
          </Togglable>
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
