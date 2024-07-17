import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, addAnectdote } from "../reducers/anecdoteReducer";
export default function AnectdotesForm() {
  const dispatch = useDispatch();

  const handleAddAnectdote = (event) => {
    event.preventDefault();
    const content = event.target.anectdote.value;
    dispatch(addAnectdote(content));
    event.target.anectdote.value = "";
  };
  return (
    <form onSubmit={handleAddAnectdote}>
      <div>
        <input name="anectdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
}
