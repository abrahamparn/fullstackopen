import React from "react";
import { useSelector, useDispatch } from "react-redux";
import anecdoteService from "../../service/anecdote";

import { setNewVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
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

  const vote = async (id, content) => {
    dispatch(await setNewVote(id));
    dispatch(setNotification(`${content} has been voted`, 2000));
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
