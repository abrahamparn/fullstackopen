import { useState } from "react";

import "./App.css";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [biggest, setBiggest] = useState(0);
  const [vote, setVote] = useState(
    Array.from({ length: anecdotes.length }, () => 0)
  );
  const randomizer = () => {
    let theRandomNumber =
      Math.floor(Math.random() * (anecdotes.length - 1 - 0 + 1)) + 0;
    setSelected(theRandomNumber);
    console.log(vote);
  };

  const handleVote = async () => {
    const newVotes = [...vote];
    newVotes[selected] += 1;
    setVote(newVotes);
    setBiggest(handleMostVote(newVotes));
  };
  const handleMostVote = (newVotes) => {
    let biggest = 0;
    let theIndex = 0;
    for (const item in newVotes) {
      if (newVotes[item] > biggest) {
        biggest = newVotes[item];
        theIndex = item;
      }
    }
    console.log("thebiggest", biggest);
    return theIndex;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} vote(s)</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={randomizer}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <p>
        {anecdotes[biggest]} has {vote[biggest]} votes
      </p>
    </div>
  );
}

export default App;
