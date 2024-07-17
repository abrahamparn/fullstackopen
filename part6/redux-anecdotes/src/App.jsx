import { useSelector, useDispatch } from "react-redux";
import { addVote, addAnectdote } from "./reducers/anecdoteReducer";
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

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleAddAnectdote}>
        <div>
          <input name="anectdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
