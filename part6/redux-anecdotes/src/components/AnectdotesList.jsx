import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addVote, addAnectdote } from "../reducers/anecdoteReducer";

const Anectdote = ({ anectdote, handleOnClick }) => {
  return (
    <div key={anectdote.id}>
      <div>{anectdote.content}</div>
      <div>
        has {anectdote.votes}
        <button onClick={() => handleOnClick(anectdote.id)}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const vote = (id) => {
    dispatch(addVote(id));
  };
  const dispatch = useDispatch();
  const anectdote = useSelector((state) => state);
  const sortedAnecdotes = [...anectdote].sort(
    (a, b) => Number(b.votes) - Number(a.votes)
  );
  return (
    <div>
      {sortedAnecdotes.map((n) => (
        <Anectdote key={n.key} anectdote={n} handleOnClick={vote} />
      ))}
    </div>
  );
};

export default Anecdotes;
