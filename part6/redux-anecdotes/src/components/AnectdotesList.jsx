import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addVote, addAnectdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";
const Anectdote = ({ anectdote, handleOnClick }) => {
  return (
    <div key={anectdote.id}>
      <div>{anectdote.content}</div>
      <div>
        has {anectdote.votes}
        <button onClick={() => handleOnClick(anectdote.id, anectdote.content)}>
          vote
        </button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(addVote(id));
    dispatch(notificationChange(`${content} has been voted`));
    setTimeout(() => {
      dispatch(notificationChange(null));
    }, 5000);
  };
  const anectdote = useSelector(({ anecdotes, filter }) => {
    if (filter !== "ALL") {
      return anecdotes.filter((n) =>
        n.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return anecdotes;
  });
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
