import AnectdotesForm from "./components/AnectdotesForm";
import Anecdotes from "./components/AnectdotesList";
import AnecdoteFilter from "./components/AnecdoteFilter";
const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <Anecdotes />
      <h2>create new</h2>
      <AnectdotesForm />
    </div>
  );
};

export default App;
