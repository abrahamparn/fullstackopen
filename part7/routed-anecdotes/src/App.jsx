import { useState } from "react";
import { setNotification } from "../redux/reducers/notificationReducers";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>No. {anecdote.id}</h2>
      <h3>{anecdote.content}</h3>
      <h4>
        {anecdote.author} || {anecdote.info}
      </h4>
      <h4>This has: {anecdote.votes} votes</h4>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

import useField from "./hooks/useField";

const CreateNew = (props) => {
  const dispatch = useDispatch();
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    dispatch(setNotification(`successfully adding "${content.value}"`, 5000));

    // Resetting the form fields after submission
    content.reset("");
    author.reset("");
    info.reset("");
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    content.reset();
    author.reset("");
    info.reset("");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name={content.name}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name={author.name}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input name={info.name} value={info.value} onChange={info.onChange} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleResetForm}>
          reset
        </button>
      </form>
    </div>
  );
};

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });
  return <div>{notification === null ? null : <div>{notification}</div>}</div>;
};

const Content = ({ anecdotes, addNew, anecdote }) => {
  return (
    <Routes>
      <Route
        path="/anecdote/:id"
        element={<Anecdote anecdote={anecdote} />}
      ></Route>
      <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />

      <Route path="/create" element={<CreateNew addNew={addNew} />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch("/anecdote/:id");
  const anecdote = match
    ? anecdotes.find((note) => note.id === Number(match.params.id))
    : null;
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />
      <Content anecdotes={anecdotes} addNew={addNew} anecdote={anecdote} />
      <Footer />
    </div>
  );
};

export default App;
