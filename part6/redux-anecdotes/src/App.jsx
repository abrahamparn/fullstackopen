import AnectdotesForm from "./components/AnectdotesForm";
import Anecdotes from "./components/AnectdotesList";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";
import anecdoteService from "../service/anecdote";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <Anecdotes />
      <h2>create new</h2>
      <AnectdotesForm />
    </div>
  );
};

export default App;
