import { useSelector, useDispatch } from "react-redux";
import { addVote, addAnectdote } from "./reducers/anecdoteReducer";
import AnectdotesForm from "./components/AnectdotesForm";
import Anecdotes from "./components/AnectdotesList";
const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
  };

  const handleAddAnectdote = (event) => {
    event.preventDefault();
    const content = event.target.anectdote.value;
    dispatch(addAnectdote(content));
    event.target.anectdote.value = "";
  };

  const sortedAnecdotes = [...anecdotes].sort(
    (a, b) => Number(b.votes) - Number(a.votes)
  );

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <AnectdotesForm />
    </div>
  );
};

export default App;
